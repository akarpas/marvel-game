const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const boom = require('boom');
const shuffle = require('lodash.shuffle');
const md5 = require('md5');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({
  limit: '2000kb'
}));

app.post('/v1/api/fetch_cards', async (req, res, next) => {
  const { API_KEY, PRIVATE_KEY } = process.env;
  const { body } = req;

  if (Object.keys(body).length === 0) {
    return next(boom.badRequest('Body has not been provided! '))
  }

  const { heroes } = req.body;
  if (!heroes || !heroes.length || (typeof heroes !== 'object' && !heroes.length)) {
    return next(boom.badRequest(`Incorrect data provided! Accepts a heroes array with the names of the heroes`));
  }

  const urls = heroes.map((hero) => {
    const ts = Date.now() / 1000;
    const hash = md5(ts + PRIVATE_KEY + API_KEY);
    const baseUrl = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&name=`;
    return `${baseUrl}${hero}&limit=1&apikey=${API_KEY}&hash=${hash}`;
  });

  const apiCalls = urls.map(async (url) => {
    try {
      let response = await axios.get(url);
      if (response.data.data.results.length) return { response, error: null };
      response = await axios.get(url);
      if (response.data.data.results.length) return { response, error: null };
      return next(boom.notFound('Something went wrong with the call! No results found.'))
    } catch (error) {
      const { response } = error;
      const { status, statusText } = response;
      return {
        error: true,
        status,
        statusText
      }
    }
  });

  const avatars = await axios.all(apiCalls).then(axios.spread((...response) => response));
  if (avatars[0].error) {
    const { status } = avatars[0]
    if (status === 401) {
      return next(boom.unauthorized('Unauthorized access to Marvel API.'));
    } else if (status === 429) {
      return next(boom.unauthorized('Too many requests to Marvel API. Limit reached. Try again later.'));
    }
  } else {
    const avatarImages = avatars.map((avatar, index) => {
      const { response } = avatar;
      const { results } = response.data.data;
      const { thumbnail } = results[0];
      const { path, extension } = thumbnail;
      return { image: `${path.replace('http', 'https')}.${extension}`, hero: heroes[index] };
    });

    const allAvatars = shuffle(avatarImages.concat(avatarImages));
    res.send({
      statusCode: 200,
      avatars: allAvatars,
    });
  }
});

app.use((err, req, res, next) => {
  const { output } = err;
  const { payload } = output;
  const { message, statusCode, error } = payload;
  if (err.isServer) {
    console.error('Server error: ', err);
    res.send({
      statusCode,
      error: err,
      message,
    });
  }
  res.send({
    statusCode,
    error,
    message,
  });
});

module.exports = app;
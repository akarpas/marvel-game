const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const shuffle = require('lodash.shuffle');
const md5 = require('md5');
const port = 5050;
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
  if (!body) {
    res.status(400).send({
      error: "no data provided"
    });
  }

  const { heroes } = req.body;
  if (!heroes || !heroes.length) {
    res.status(400).send({
      error: "no data provided"
    });
  }

  const urls = heroes.map((hero) => {
    const ts = Date.now() / 1000;
    const hash = md5(ts + PRIVATE_KEY + API_KEY);
    const baseUrl = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&name=`;
    return `${baseUrl}${hero}&limit=1&apikey=${API_KEY}&hash=${hash}`;
  });

  const promises = urls.map(async (url) => {
    try {
      let response = await axios.get(url);
      if (response.data.data.results.length) return { response, error: null };
      response = await axios.get(url);
      if (response.data.data.results.length) return { response, error: null };
      return { response, error: 'Something went wrong with the call. No results found.' };
    } catch (error) {
      return { response: [], error: `Something went wrong with the call, retrying - Error: ${error}` };
    }
  });

  const avatars = await axios.all(promises).then(axios.spread((...response) => response));

  // TODO: Check for error (loop through avatars for any errors);

  const avatarImages = avatars.map((avatar, index) => {
    const { response } = avatar;
    const { results } = response.data.data;
    const { thumbnail } = results[0];
    const { path, extension } = thumbnail;
    return { image: `${path}.${extension}`, hero: heroes[index] };
  });
  const allAvatars = shuffle(avatarImages.concat(avatarImages));

  res.status(200).send({
    error: null,
    avatars: allAvatars,
  });
});

app.listen(port, function () {
  console.log("Server is running on "+ port +" port");
});
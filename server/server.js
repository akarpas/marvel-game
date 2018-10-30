const express = require('express');
const dotenv = require('dotenv');
const shuffle = require('lodash.shuffle');
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

  const allAvatars = shuffle(avatarImages.concat(avatarImages));

  res.status(200).send({
    error: null,
    avatars: allAvatars,
  });
});

app.listen(port, function () {
  console.log("Server is running on "+ port +" port");
});
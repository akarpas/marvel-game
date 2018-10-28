import axios from 'axios';
// import _ from 'lodash';
import md5 from 'md5';
import {
  GET_AVATARS,
  AVATARS_LOADING,
} from './types';

const fetchAvatars = async (dispatch, heroes) => {
  dispatch({
    type: AVATARS_LOADING,
    payload: null,
  });

  const apiKey = '15ef57ccdc882a4200f7c7165b93164a';
  const privateKey = 'cfc373ebe901e9c090416286bc72f1d9aec6c258';
  const urls = heroes.map((hero) => {
    const ts = Date.now() / 1000;
    const hash = md5(ts + privateKey + apiKey);
    const baseUrl = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&name=`;
    return `${baseUrl}${hero}&limit=1&apikey=${apiKey}&hash=${hash}`;
  });
  const promises = urls.map(url => axios.get(url));
  const avatars = await axios.all(promises).then(axios.spread((...response) => response));

  return dispatch({
    type: GET_AVATARS,
    payload: { heroes, avatars },
  });
};

export default fetchAvatars;

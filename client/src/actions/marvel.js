import axios from 'axios';
import config from '../../config.json';
import {
  GET_AVATARS,
  AVATARS_LOADING,
  CLEAR_AVATARS,
} from './types';

export const fetchAvatars = async (dispatch, heroes) => {
  dispatch({
    type: AVATARS_LOADING,
    payload: null,
  });

  const { apiUrl } = config[process.env.NODE_ENV];
  const response = await axios.post(apiUrl, { heroes });
  const { data } = response;
  const { avatars } = data;

  return dispatch({
    type: GET_AVATARS,
    payload: { heroes, avatars },
  });
};

export const clearAvatars = dispatch => dispatch({
  type: CLEAR_AVATARS,
  payload: null,
});

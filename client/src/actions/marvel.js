import axios from 'axios';
import config from '../../config.json';
import {
  GET_AVATARS,
  AVATARS_LOADING,
  CLEAR_AVATARS,
  SET_ERROR,
} from './types';

export const fetchAvatars = (dispatch, heroes) => {
  dispatch({
    type: AVATARS_LOADING,
    payload: null,
  });

  const { apiUrl } = config[process.env.NODE_ENV];
  axios.post(apiUrl, { heroes }).then((response) => {
    const { data } = response;
    const { avatars } = data;

    return dispatch({
      type: GET_AVATARS,
      payload: { heroes, avatars },
    });
  }).catch((error) => {
    dispatch({
      type: SET_ERROR,
      payload: error,
    });
  });
};

export const clearAvatars = dispatch => dispatch({
  type: CLEAR_AVATARS,
  payload: null,
});

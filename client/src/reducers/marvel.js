import _ from 'lodash';
import {
  GET_AVATARS,
  AVATARS_LOADING,
} from '../actions/types';

const INITIAL_STATE = {
  avatars: [],
  avatarsLoading: false,
};

const getAvatars = (state, payload) => {
  const { avatars, heroes } = payload;
  const avatarImages = avatars.map((avatar, index) => {
    const { results } = avatar.data.data;
    const { thumbnail } = results[0];
    const { path, extension } = thumbnail;
    return { image: `${path}.${extension}`, hero: heroes[index] };
  });
  const allAvatars = _.shuffle(avatarImages.concat(avatarImages));
  return { ...state, avatars: allAvatars, avatarsLoading: false };
};

const setLoading = (state) => { // eslint-disable-line
  return { ...state, avatarsLoading: true };
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_AVATARS:
      return getAvatars(state, action.payload);
    case AVATARS_LOADING:
      return setLoading(state);
    default:
      return state;
  }
}

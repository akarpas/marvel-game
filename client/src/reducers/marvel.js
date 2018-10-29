import _ from 'lodash';
import {
  GET_AVATARS,
  AVATARS_LOADING,
  CLEAR_AVATARS,
} from '../actions/types';

const INITIAL_STATE = {
  avatars: [],
  avatarsLoading: false,
};

const getAvatars = (state, payload) => {
  const { avatars, heroes } = payload;
  const avatarImages = avatars.map((avatar, index) => {
    // TODO: Check for error
    const { response } = avatar;
    const { results } = response.data.data;
    const { thumbnail } = results[0];
    const { path, extension } = thumbnail;
    return { image: `${path}.${extension}`, hero: heroes[index] };
  });
  const allAvatars = _.shuffle(avatarImages.concat(avatarImages));
  return { ...state, avatars: allAvatars, avatarsLoading: false };
};

const setLoading = state => ({ ...state, avatarsLoading: true });

const clearAvatars = state => ({ ...state, avatars: [] });

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_AVATARS:
      return getAvatars(state, action.payload);
    case AVATARS_LOADING:
      return setLoading(state);
    case CLEAR_AVATARS:
      return clearAvatars(state);
    default:
      return state;
  }
}

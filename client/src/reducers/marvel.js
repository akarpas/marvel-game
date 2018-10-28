import {
  GET_AVATARS,
  AVATARS_LOADING,
} from '../actions/types';

const INITIAL_STATE = {
  avatars: [],
  avatarsLoading: false,
};

const getAvatars = (state, avatars) => {
  const avatarImages = avatars.map((avatar) => {
    const { results } = avatar.data.data;
    const { thumbnail } = results[0];
    const { path, extension } = thumbnail;
    return `${path}.${extension}`;
  });
  return { ...state, avatars: avatarImages, avatarsLoading: false };
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

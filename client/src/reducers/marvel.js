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
  const { avatars } = payload;
  return { ...state, avatars, avatarsLoading: false };
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

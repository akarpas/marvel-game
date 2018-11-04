import {
  GET_AVATARS,
  AVATARS_LOADING,
  CLEAR_AVATARS,
  SET_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  avatars: [],
  avatarsLoading: false,
  error: null,
};

const getAvatars = (state, payload) => {
  const { avatars } = payload;
  return { ...state, avatars, avatarsLoading: false, error: null };
};

const setLoading = state => ({ ...state, avatarsLoading: true, error: null });

const clearAvatars = state => ({ ...state, avatars: [], error: null });

const setError = (state, error) => ({ ...state, avatars: [], avatarsLoading: false, error });


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_AVATARS:
      return getAvatars(state, action.payload);
    case AVATARS_LOADING:
      return setLoading(state);
    case CLEAR_AVATARS:
      return clearAvatars(state);
    case SET_ERROR:
      return setError(state, action.payload);
    default:
      return state;
  }
}

import * as types from '../Constant/actionType';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case types.GET_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.data,
      });
    case types.GET_FAILED:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      });
    // case types.GET_UPDATE:
    //   return Object.assign({}, state, {
    //     loading: false,
    //     error: action.error,
    //     data: action.data.item
    //   });
    default:
      return state;
  }
}

export default todoReducer;

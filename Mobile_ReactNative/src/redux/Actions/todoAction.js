import * as types from '../Constant/actionType';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getRequest = () => ({
  type: types.GET_REQUEST,
});

export const getSuccess = (data) => ({
  type: types.GET_SUCCESS,
  data,
});

export const getFailed = (error) => ({
  type: types.GET_FAILED,
  error,
});

export const todoAction = () => {
  return async (dispatch) => {
    try {
      dispatch(getRequest());
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      console.log('data di redux', JSON.parse(jsonValue));
      dispatch(getSuccess(JSON.parse(jsonValue)));
    } catch (e) {
      dispatch(getFailed(e));
    }
  };
};

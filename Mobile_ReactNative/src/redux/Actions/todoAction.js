import * as types from '../Constant/actionType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

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
      let item = await AsyncStorage.getItem('@storage_Key').then((item) =>
        JSON.parse(item),
      );
      const now = moment().format('YYYY-MM-DD');
      item.item.map((data) => {
        if (moment(now).isAfter(data.dueTime)) {
          data.lewat = true;
        }
      });
      const jsonValue = JSON.stringify(item);
      dispatch(getSuccess(JSON.parse(jsonValue)));
    } catch (e) {
      dispatch(getFailed(e));
    }
  };
};

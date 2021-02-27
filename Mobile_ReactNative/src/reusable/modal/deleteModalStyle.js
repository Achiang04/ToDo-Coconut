import {StyleSheet} from 'react-native';
import {wp, hp} from '../../reusable/responsive/dimen';
import {RFPercentage} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    width: wp(200),
    backgroundColor: '#6D26FB',
    borderRadius: 10,
    padding: wp(20),
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    padding: wp(5),
    borderRadius: 7,
    marginRight: wp(10),
  },
  yesButton: {
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
    padding: wp(5),
    borderRadius: 7,
    marginRight: wp(10),
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: hp(15),
    textAlign: 'center',
    color: '#fff',
    fontSize: RFPercentage(2.2),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default styles;

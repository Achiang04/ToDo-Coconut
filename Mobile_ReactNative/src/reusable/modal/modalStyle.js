import {StyleSheet} from 'react-native';
import {wp, hp} from '../../reusable/responsive/dimen';
import {RFPercentage} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: wp(30),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: hp(15),
    textAlign: 'center',
    fontSize: RFPercentage(2.5),
    color: 'black',
  },
  button: {
    borderWidth: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#6D26FB',
    borderColor: '#6D26FB',
    height: 50,
    borderRadius: 8,
  },
  textButton: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#fff',
  },
  kolomRespon1: {
    borderWidth: 1,
    marginTop: hp(10),
    width: wp(240),
    borderRadius: 10,
    height: hp(50),
    borderColor: 'rgba(0, 0, 0, 0.3)',
    padding: wp(10),
  },
  kolomRespon2: {
    borderWidth: 1,
    marginTop: hp(10),
    width: wp(240),
    borderRadius: 10,
    height: hp(100),
    borderColor: 'rgba(0, 0, 0, 0.3)',
    padding: wp(10),
  },
  create: {
    padding: wp(7),
    borderWidth: 1,
    marginTop: hp(15),
    borderRadius: 7,
    backgroundColor: '#6D26FB',
    borderColor: '#6D26FB',
  },
});

export default styles;

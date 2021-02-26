import {StyleSheet} from 'react-native';
import {wp, hp} from '../../reusable/responsive/dimen';
import {RFPercentage} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  modalView: {
    // backgroundColor: '#160E24',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  kolomRespon3: {
    borderWidth: 1,
    marginTop: hp(10),
    width: wp(240),
    borderRadius: 10,
    height: hp(50),
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
  pilihJenjang: {
    width: wp(100),
    marginLeft: wp(20),
    marginTop: hp(20),
    alignSelf: 'center',
  },
  dropStyle: {
    backgroundColor: '#FBFBFD',
    borderColor: '#A6ACB3',
  },
  labelStyle: {
    fontSize: RFPercentage(1.8),
    color: '#002911',
  },
  row: {
    flexDirection: 'row',
  },
  useDate: {
    marginTop: hp(6),
  },
});

export default styles;

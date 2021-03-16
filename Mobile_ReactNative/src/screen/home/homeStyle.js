import {StyleSheet} from 'react-native';
import {wp, hp} from '../../reusable/responsive/dimen';
import {RFPercentage} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#160E24',
  },
  title: {
    marginLeft: wp(20),
    marginTop: wp(20),
    fontSize: RFPercentage(5),
    color: '#fff',
    fontWeight: 'bold',
  },
  todoText: {
    color: '#fff',
    fontSize: RFPercentage(2.5),
  },
  todoContainer: {
    padding: wp(15),
    borderWidth: 1,
    backgroundColor: '#3A2C56',
    marginTop: hp(20),
    width: '90%',
    alignSelf: 'center',
  },
  todoTextSelected: {
    color: '#fff',
    fontSize: RFPercentage(2.5),
    textDecorationLine: 'line-through',
    // width: wp(100),
  },
  todoContainerSelected: {
    padding: wp(15),
    borderWidth: 1,
    backgroundColor: '#3A2C56',
    marginTop: hp(20),
    width: '90%',
    alignSelf: 'center',
    opacity: 0.3,
  },
  button: {
    position: 'absolute',
    width: '100%',
    bottom: hp(0),
    height: hp(70),
    backgroundColor: '#160E24',
    justifyContent: 'center',
  },
  check: {
    position: 'absolute',
    right: wp(10),
    top: hp(13),
  },
  edit: {
    position: 'absolute',
    right: wp(40),
    top: hp(19),
  },
  tambahan: {
    marginTop: hp(5),
  },
  todoTextTambahan: {
    color: '#ADA4BD',
    fontSize: RFPercentage(2.2),
  },
  todoTextTambahanSelected: {
    color: '#ADA4BD',
    fontSize: RFPercentage(2.2),
    textDecorationLine: 'line-through',
  },
  status: {
    color: '#fff',
    fontSize: RFPercentage(3),
  },
  statusContainer: {
    alignSelf: 'center',
    marginTop: hp(230),
  },
  categoryContainer: {
    borderWidth: 1,
    backgroundColor: '#6D26FB',
    borderColor: '#6D26FB',
    borderRadius: 5,
    padding: wp(2),
    alignSelf: 'flex-start',
    marginBottom: hp(5),
    marginRight: wp(5),
  },
  categoryText: {
    color: '#fff',
    fontSize: RFPercentage(2),
  },
  categoryTextSelected: {
    color: '#fff',
    fontSize: RFPercentage(2),
    textDecorationLine: 'line-through',
  },
  delete: {
    position: 'absolute',
    top: hp(50),
    right: wp(14),
  },
  row: {
    flexDirection: 'row',
  },
  lewatContainer: {
    borderWidth: 1,
    backgroundColor: 'red',
    borderColor: 'red',
    borderRadius: 5,
    padding: wp(2),
    alignSelf: 'flex-start',
    marginBottom: hp(5),
    marginRight: wp(5),
  },
  lewatText: {
    color: '#fff',
    fontSize: RFPercentage(2),
    textDecorationLine: 'line-through',
  },
  pilihJenjang: {
    width: wp(130),
    marginLeft: wp(20),
    marginTop: hp(10),
  },
  dropStyle: {
    backgroundColor: '#6D26FB',
    borderColor: '#6D26FB',
  },
  labelStyle: {
    fontSize: RFPercentage(2.2),
    color: '#fff',
  },
  validation: {
    width: wp(200),
  },
});

export default styles;

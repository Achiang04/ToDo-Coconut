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
    bottom: hp(20),
    width: '100%',
  },
  check: {
    position: 'absolute',
    right: wp(10),
    top: hp(13),
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
});

export default styles;

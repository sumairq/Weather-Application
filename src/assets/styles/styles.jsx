import {StyleSheet} from 'react-native';
import {deviceHeight, deviceWidth} from '../../utils/helpers';

export const stylesCommon = StyleSheet.create({

    alignCenter: {alignSelf: 'center'},
    commonButton: { width: 150, borderRadius: 50 },
    buttonContainer: { margin: 5, borderRadius: 50 },
  container: {
    position: 'absolute',
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: deviceWidth ,
  },
  innerContainer: {paddingHorizontal: 20, marginTop: 20},
  mainHeader: {fontSize: 40, color: 'white', marginBottom: 20},
  secondaryHeader: {color: 'white', fontSize: 22, fontWeight: 'bold'},
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  inputText: {paddingHorizontal: 10, color: 'white', fontSize: 16},
  currentDataContainer: {
    marginTop: 50,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: deviceHeight - 400,
  },
  cityText: {color: 'white', fontSize: 40},
  cityWeather: {fontSize: 22, color: 'white', textAlign: 'center'},
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
  mainWeatherIcon: { width: 100, height: 100 },
  degreeTextMain: {color: 'white', fontSize: 64},

  detailsHeadText: {color: 'white', fontSize: 22, marginBottom: 16},

  imageBackground: {
    height: deviceHeight,
    width: deviceWidth,
  },
});


export const stylesDetails = StyleSheet.create({
    layout : {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: deviceHeight - 100,
    },

    errorContainer:{
    display: 'flex',
    flexDirection: 'Column',
    alignItems: 'center',
    },
    errorText:{
        color: 'white',
        fontSize: 27,
        zIndex: 999,
    }
})
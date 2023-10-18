import { Dimensions, PermissionsAndroid } from "react-native";
import { days } from "../common/constants";

// Get measurements of user device to help in styling
export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;


// Extract a single entry from 5 day weather forecast that has 40 entries, each representing weather at 3 hour inteval.
export const extractFiveDayWeather = (data: any)=>{
    let weatherData = [];
    for(let i = 0; i < data.length; i = i + 8){
       weatherData.push(data[i])
    }
    return weatherData
}
// Parse the raw date to something more readable
export const parseDate = (item: any)=>{
    var d = new Date(item['dt'] * 1000);
   return days[d.getDay()];
} 

// Function for requesting the Location Permission for the user

export const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };



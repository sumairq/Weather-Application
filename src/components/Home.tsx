import {
  View,
  Text,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Image} from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import {stylesCommon} from '../assets/styles/styles';
import Geolocation from 'react-native-geolocation-service';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {deviceWidth, requestLocationPermission} from '../utils/helpers';
import useFetchCurrentLocationWeather from '../hooks/useFetchCurrentLocationWeather';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import Data from './reusable/Data';

const Stack = createNativeStackNavigator();

//Todo

// Divide these into individual components that make more sense
//Possible components
// Seach Bar
//Weather Details

// Define more concrete types
interface HomeProps {
  navigation: any; // Adjust the type as needed
}

const Home = (props: HomeProps) => {
  const submitHandler = () => {
    if (city) {
      props.navigation.navigate('Details', {name: city});
    } else {
      Alert.alert('City is empty', 'Please enter a city name');
    }
  };

  // function to check permissions and get Location
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            setViewLocation(position);
          },
          error => {
            // See error code charts below.
           Alert.alert('Error', 'Could not get location')
            
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  const [city, setCity] = useState('');
  // state to hold location
  const [viewLocation, setViewLocation] = useState();
  
//Todo:  Use error state 
  const {data, error} = useFetchCurrentLocationWeather(viewLocation);

  return (
    <View>
      <ImageBackground
        source={require('../assets/images/background2.jpg')}
        style={stylesCommon.imageBackground}
        imageStyle={{opacity: 0.6, backgroundColor: 'black'}}
      />
      <View style={stylesCommon.container}>
        <View style={stylesCommon.innerContainer}>
          <Text style={stylesCommon.mainHeader}>Pattern Weather</Text>
          <Text style={stylesCommon.secondaryHeader}>
            {' '}
            Search By City{' '}
          </Text>
          <View style={stylesCommon.inputContainer}>
            <TextInput
              value={city}
              onChangeText={val => setCity(val)}
              placeholder="Search City"
              placeholderTextColor="white"
              style={stylesCommon.inputText}
            />
            <TouchableOpacity onPress={() => submitHandler()}>
              <Icon name="search" size={22} color="white" />
            </TouchableOpacity>
          </View>
          <View style={stylesCommon.alignCenter}></View>
          {data ? (
            <View style={stylesCommon.currentDataContainer}>
              <View>
                <Text style={stylesCommon.cityText}>{data['name']}</Text>
                <Text style={stylesCommon.cityWeather}>
                  {data['weather'][0]['main']}
                </Text>
              </View>

              <Image
                transitionDuration={1000}
                source={{
                  uri: `https://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png`,
                }}
                style={{width: 100, height: 100}}
              />

              <Text style={stylesCommon.degreeTextMain}>
                {(data['main']['temp'] - 273).toFixed(2)}&deg; C
              </Text>
              <Text style={stylesCommon.detailsHeadText}>Weather Details</Text>
              <View style={{width: deviceWidth - 60}}>
                <Data value={data['wind']['speed']} title="Wind" />
                <Data value={data['main']['pressure']} title="Pressure" />
                <Data value={`${data['main']['humidity']}%`} title="Humidity" />
                <Data value={data['visibility']} title="Visibility" />
              </View>
            </View>
          ) : (
            <View style={{marginTop: 40}}>
              <Text style={stylesCommon.cityText}>
                <Icon name="location-outline" size={34} color="white" />{' '}
                Fetching Weather data for Current location
              </Text>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Home;

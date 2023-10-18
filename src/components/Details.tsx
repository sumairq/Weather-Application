import {View, ImageBackground, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import {deviceHeight, deviceWidth} from '../utils/helpers';
import Icon from 'react-native-vector-icons/Ionicons';
import { stylesCommon, stylesDetails } from '../assets/styles/styles';
import FiveDayForecast from './FiveDayForecast';
import {Divider, Image} from '@rneui/base';
import { Button } from '@rneui/base';
import Data from './reusable/Data';
import useFetchCurrentData from '../hooks/useFetchCurrentData';

interface DetailsProps {
  route: {
    params: {
      name: string;
    };
  };
}
// Todo : Implement a loader component for the main results.
export default function Details(props: DetailsProps) {
  const [fiveDay, setFiveDay] = useState(false);
  const {name} = props.route.params;
  const { data, loading, error } = useFetchCurrentData(name);

 if(!error){
  return (
    <View>
      <ImageBackground
        source={require('../assets/images/background1.jpg')}
        style={stylesCommon.imageBackground}
        imageStyle={{opacity: 0.6, backgroundColor: 'black'}}
      />
      <View
        style={stylesCommon.container}>
        {data  ?  (
          <View
            style={stylesDetails.layout}>
            <View>
              <Text style={stylesCommon.cityText}>{name}</Text>
              <Text style={stylesCommon.cityWeather}>
                {data['weather'][0]['main']}
              </Text>
            </View>

            <Image
      transitionDuration={1000}
      source={{
        uri:
          `https://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png`
      }}
      style={stylesCommon.mainWeatherIcon}
    />

            <Text style={stylesCommon.degreeTextMain}>
              {(data['main']['temp'] - 273).toFixed(2)}&deg; C
            </Text>

            <Button
      buttonStyle={stylesCommon.commonButton}
      containerStyle={stylesCommon.buttonContainer}
      disabledStyle={{
        borderWidth: 2,
        borderColor: "#00F"
      }}
      disabledTitleStyle={{ color: "#00F" }}
      loadingProps={{ animating: true }}
      loadingStyle={{}}
      onPress={() => setFiveDay(!fiveDay)}
      title={fiveDay? "current weather" : "five day forecast"}
      titleProps={{}}
      titleStyle={{ marginHorizontal: 5 }}
    />

            <Divider
              style={{width: '80%'}}
              color="#2089dc"
              insetType="left"
              subHeaderStyle={{}}
              width={1}
              orientation="horizontal"
            />
        { !fiveDay ?
            (<View>
              <Text style={stylesCommon.detailsHeadText}>
                Weather Details
              </Text>
              <View style={{width: deviceWidth - 60}}>
                <Data value={data['wind']['speed']} title="Wind" />
                <Data value={data['main']['pressure']} title="Pressure" />
                <Data value={`${data['main']['humidity']}%`} title="Humidity" />
                <Data value={data['visibility']} title="Visibility" />
              </View>
            </View>) : (
                <View>
                     <Text style={stylesCommon.detailsHeadText}>
                      5 day Forecast
              </Text>
                <FiveDayForecast name={name}/>
                </View>
            )
}
          </View>
        ) : null}
      </View>
    </View>
  )}else{
    return (
      <View>
        <ImageBackground
        source={require('../assets/images/background1.jpg')}
        style={stylesCommon.imageBackground}
        imageStyle={{opacity: 0.6, backgroundColor: 'black'}}
      />
      <View style={stylesCommon.container}>
        <View style={stylesDetails.errorContainer}>

      <Icon name="bug-outline" size={27} color="white" />
  <Text style={stylesDetails.errorText}>Error! Invalid City Name</Text>
        </View>
        
      </View>
        </View>
    )
  }
}

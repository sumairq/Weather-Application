import React from 'react';
import { View, Text, TouchableHighlight, ActivityIndicator } from 'react-native';
import useFetchForecast from '../hooks/useFetchForecast';
import { deviceWidth, extractFiveDayWeather, parseDate } from '../utils/helpers';
import Data from './reusable/Data';

// Define the type for the props
interface FiveDayForecastProps {
  name: string;
}
// Todo: Handle network errors 
const FiveDayForecast: React.FC<FiveDayForecastProps> = ({ name }) => {
  const { data, loading, error } = useFetchForecast(name);

  return !loading && data ? (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: deviceWidth - 60,
      }}
    >
      {extractFiveDayWeather(data['list']).map((item, index) => (
        <Data
          icon={`https://openweathermap.org/img/wn/${item['weather'][0]['icon']}@2x.png`}
          title={parseDate(item)}
          value={`${(item['main']['temp'] - 273).toFixed(2)} C`}
          key={index}
        />
      ))}
    </View>
  ) : (
    <ActivityIndicator size="small" color="#0000ff" />
  );
};

export default FiveDayForecast;

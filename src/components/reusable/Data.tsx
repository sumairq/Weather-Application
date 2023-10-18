import {View, Text} from 'react-native';
import {Image} from '@rneui/base';
import React from 'react';

interface DataProps {
  title: string;
  value: string;
  icon?: string; // Make the icon optional
}

// Todo: Cleanup Styles and shift to stylesheet

const Data = ({title, value, icon}: DataProps) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
    <Text style={{color: 'gray', fontSize: 22}}>{title}</Text>
    {icon ? (
      <Image
        transitionDuration={1000}
        source={{
          uri: icon,
        }}
        style={{width: 30, height: 30}}
      />
    ) : null}
    <Text style={{color: 'white', fontSize: 22}}>{value}</Text>
  </View>
);

export default Data;

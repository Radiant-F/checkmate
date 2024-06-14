import {Image} from 'react-native';
import React from 'react';
import {stylesComponent} from '../styles';

export default function Background(): React.JSX.Element {
  return (
    <Image
      source={require('../assets/background-image.jpg')}
      style={stylesComponent.image}
    />
  );
}

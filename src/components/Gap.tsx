import {DimensionValue, View} from 'react-native';
import React from 'react';

type GapTypes = {
  width?: DimensionValue;
  height?: DimensionValue;
};

export default function Gap({width, height}: GapTypes) {
  return <View style={{width, height}} />;
}

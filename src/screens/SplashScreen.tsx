import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {Background} from '../components';
import EncryptedStorage from 'react-native-encrypted-storage';
import {SplashScreenNavigationProps} from '../routes/config';
import axios from 'axios';
import {stylesScreen} from '../styles';

export default function SplashScreen({
  navigation,
}: SplashScreenNavigationProps): React.JSX.Element {
  async function refreshToken() {
    try {
      const credential = await EncryptedStorage.getItem('user_credential');
      if (credential) {
        const {data} = await axios.post(
          'https://todo-api-omega.vercel.app/api/v1/auth/login',
          JSON.parse(credential),
        );
        navigation.replace('Home', {token: data.user.token});
      } else setTimeout(() => navigation.replace('SignIn'), 2000);
    } catch (error) {
      console.log('ERROR:', error);
      navigation.replace('SignIn');
    }
  }

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <View style={stylesScreen.containerCenter}>
      <Background />
      <Image
        source={require('../assets/app_logo.png')}
        style={{width: 150, height: 150}}
      />
      <Text style={stylesScreen.textVersion}>v0.0.1-alpha-rc</Text>
    </View>
  );
}

import {Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {HomeNavigationProps} from '../../routes/config';
import {stylesComponent} from '../../styles';

type HeaderProps = {
  token: string;
  navigation: HomeNavigationProps['navigation'];
};

export default function Header({
  token,
  navigation,
}: HeaderProps): React.JSX.Element {
  const [username, setUsername] = useState<string>('User Name');

  async function getUser() {
    try {
      const {data} = await axios.get(
        'https://todo-api-omega.vercel.app/api/v1/profile',
        {headers: {Authorization: `Bearer ${token}`}},
      );
      setUsername(data.user.username);
    } catch (error) {
      console.log('ERROR:', error);
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  function signOut() {
    Alert.alert('Keluar?', 'Sesi Anda akan berakhir.', [
      {
        text: 'Keluar',
        onPress: () => {
          EncryptedStorage.clear()
            .then(() => navigation.replace('SignIn'))
            .catch(error => console.log(error));
        },
      },
      {text: 'Batal'},
    ]);
  }

  return (
    <View style={stylesComponent.containerHeader}>
      <TouchableOpacity style={stylesComponent.btnSignOut} onPress={signOut}>
        <Icon name="logout" size={35} color={'white'} />
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <Text style={{color: 'white'}}>Hi,</Text>
        <Text style={stylesComponent.textUsername}>{username}</Text>
      </View>
      <Icon name="account-circle" color="white" size={45} />
    </View>
  );
}

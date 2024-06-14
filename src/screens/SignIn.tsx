import {
  Text,
  View,
  TouchableNativeFeedback,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Background, FormInput, Gap} from '../components';
import CheckBox from '@react-native-community/checkbox';
import EncryptedStorage from 'react-native-encrypted-storage';
import {SignInNavigationProps} from '../routes/config';
import axios, {isAxiosError} from 'axios';
import {stylesScreen} from '../styles';

export default function SignIn({
  navigation,
}: SignInNavigationProps): React.JSX.Element {
  const [rememberUser, setRememberUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // form data
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function submitSignIn() {
    setLoading(true);
    try {
      const {data} = await axios.post(
        'https://todo-api-omega.vercel.app/api/v1/auth/login',
        {email, password},
      );
      if (rememberUser)
        await EncryptedStorage.setItem(
          'user_credential',
          JSON.stringify({email, password}),
        );
      navigation.replace('Home', {token: data.user.token});
    } catch (error) {
      setLoading(false);
      if (isAxiosError(error)) {
        ToastAndroid.show(error.response?.data.message, ToastAndroid.LONG);
        console.log('ERROR RESPONSE:', error);
      } else console.log('ERROR:', error);
    }
  }

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Background />

      <View>
        <ScrollView contentContainerStyle={stylesScreen.container}>
          <Text style={stylesScreen.textAuthTitle}>Sign In</Text>
          <Gap height={15} />
          <View style={stylesScreen.viewAuth}>
            <FormInput
              title="Email"
              icon="gmail"
              keyboardType="email-address"
              placeholder="contoh@email.com"
              autoCapitalize="none"
              onChangeText={setEmail}
            />

            <Gap height={20} />

            <FormInput
              title="Password"
              icon="lock"
              placeholder="Kata sandi..."
              autoCapitalize="none"
              password
              onChangeText={setPassword}
            />

            {/* CheckBox Remember Me */}
            <View style={stylesScreen.viewRememberMe}>
              <CheckBox
                tintColors={{false: 'white', true: 'white'}}
                value={rememberUser}
                onValueChange={() => setRememberUser(!rememberUser)}
              />
              <Text
                style={{color: 'white'}}
                onPress={() => setRememberUser(!rememberUser)}>
                Ingat Saya
              </Text>
            </View>

            <Gap height={20} />

            {/* Submit & Register Buttons */}
            <TouchableNativeFeedback useForeground onPress={submitSignIn}>
              <View style={stylesScreen.btnAuthSubmit}>
                {loading ? (
                  <ActivityIndicator color={'white'} />
                ) : (
                  <Text style={stylesScreen.textBtnTitle}>Masuk</Text>
                )}
              </View>
            </TouchableNativeFeedback>
            <Gap height={10} />
            <TouchableNativeFeedback
              useForeground
              onPress={() => navigation.navigate('SignUp')}>
              <View
                style={{
                  ...stylesScreen.btnAuthSubmit,
                  backgroundColor: '#9A4242',
                  width: '55%',
                }}>
                <Text style={stylesScreen.textBtnTitle}>Daftar</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

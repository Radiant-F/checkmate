import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  SplashScreen: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: {token: string};
};

export type SplashScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'SplashScreen'
>;

export type SignInNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'SignIn'
>;

export type SignUpNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'SignUp'
>;

export type HomeNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

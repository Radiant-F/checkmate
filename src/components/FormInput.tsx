import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {stylesComponent} from '../styles';

type FormInputType = {
  title?: string;
  icon?: string;
  password?: boolean;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  textCounter?: {
    show: boolean;
    value: string;
    valueLimit: number;
    valueMinimum: number;
  };
  inputValue?: string;
};

export default function FormInput({
  title = 'Judul Form',
  icon = 'gmail',
  password = false,
  onChangeText,
  placeholder = 'Placeholder...',
  keyboardType,
  autoCapitalize = 'sentences',
  textCounter,
  inputValue,
}: FormInputType): React.JSX.Element {
  const [securePassword, setSecurePassword] = useState<boolean>(true);

  return (
    <View>
      <Text style={{color: 'white'}}>{title}</Text>
      <View style={stylesComponent.containerInput}>
        <Icon name={icon} color={'black'} size={23} />
        <TextInput
          placeholder={placeholder}
          style={stylesComponent.textInput}
          secureTextEntry={password && securePassword}
          autoCapitalize={autoCapitalize}
          onChangeText={onChangeText}
          placeholderTextColor={'grey'}
          keyboardType={keyboardType}
          value={inputValue}
        />
        {password && (
          <TouchableOpacity onPress={() => setSecurePassword(!securePassword)}>
            <Icon
              name={securePassword ? 'eye-off' : 'eye'}
              color={'black'}
              size={23}
            />
          </TouchableOpacity>
        )}
      </View>
      {textCounter?.show && (
        <Text
          style={{
            ...stylesComponent.textInputCounter,
            color:
              textCounter.value.length < textCounter.valueMinimum
                ? 'tomato'
                : 'white',
          }}>
          {textCounter.value.length}/{textCounter.valueLimit}
        </Text>
      )}
    </View>
  );
}

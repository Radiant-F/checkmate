import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FormInput from '../FormInput';
import {stylesComponent} from '../../styles';

type ModalTypes = {
  visible: boolean;
  loading: boolean;
  valueTitle: string;
  valueDesc: string;
  onRequestClose: () => void;
  onPressSubmit: () => void;
  onChangeTitle: (title: string) => void;
  onChangeDesc: (desc: string) => void;
};

export default function ModalEditTask({
  visible,
  onRequestClose,
  onChangeTitle,
  valueTitle = '',
  onChangeDesc,
  valueDesc = '',
  onPressSubmit,
  loading,
}: ModalTypes): React.JSX.Element {
  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="fade">
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Pressable onPress={onRequestClose} style={stylesComponent.backdrop} />
        <View>
          <ScrollView>
            <View style={stylesComponent.containerModal}>
              <View style={stylesComponent.modalHeader}>
                <Icon name={'playlist-edit'} size={25} color={'white'} />
                <Text style={{color: 'white'}}>Edit Tugas</Text>
                <TouchableOpacity onPress={onRequestClose}>
                  <Icon name="close-circle-outline" size={25} color={'white'} />
                </TouchableOpacity>
              </View>

              <View style={stylesComponent.viewModalInput}>
                <FormInput
                  title="Judul"
                  icon="text"
                  placeholder="Judul tugas..."
                  onChangeText={onChangeTitle}
                  inputValue={valueTitle}
                  textCounter={{
                    show: true,
                    value: valueTitle,
                    valueLimit: 255,
                    valueMinimum: 3,
                  }}
                />
                <FormInput
                  title="Deskripsi"
                  icon="text-long"
                  placeholder="Deskripsi tugas..."
                  onChangeText={onChangeDesc}
                  inputValue={valueDesc}
                  textCounter={{
                    show: true,
                    value: valueDesc,
                    valueLimit: 255,
                    valueMinimum: 20,
                  }}
                />

                <TouchableNativeFeedback useForeground onPress={onPressSubmit}>
                  <View style={stylesComponent.btnSubmitModal}>
                    {loading ? (
                      <ActivityIndicator color={'white'} />
                    ) : (
                      <Text style={stylesComponent.textBtnTitle}>Tambah</Text>
                    )}
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

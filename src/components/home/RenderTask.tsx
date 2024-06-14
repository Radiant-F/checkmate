import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../Gap';

type RenderItemProps = {
  item: {
    title: string;
    desc: string;
    checked: boolean;
    _id: string;
  };
  open: boolean;
  onCheckBox: () => void;
  onPressEdit: () => void;
  onPressDelete: () => void;
  onPressDetail: () => void;
};

export default function RenderTask({
  item,
  onCheckBox,
  onPressDetail,
  open,
  onPressEdit,
  onPressDelete,
}: RenderItemProps) {
  return (
    <View style={styles.viewItem}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CheckBox
          value={item.checked}
          tintColors={{true: 'white', false: 'white'}}
          onValueChange={onCheckBox}
        />
        <Text style={styles.textItemTitle}>{item.title}</Text>
        <TouchableNativeFeedback useForeground onPress={onPressDetail}>
          <View style={styles.btnDetail}>
            <Icon
              name={open ? 'chevron-up' : 'chevron-down'}
              color={'white'}
              size={30}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
      {open && (
        <View>
          <Text style={styles.textDesc}>{item.desc}</Text>
          <View style={styles.viewBtnOption}>
            <TouchableNativeFeedback useForeground onPress={onPressDelete}>
              <View style={styles.btnDelete}>
                <Icon name="trash-can" color={'white'} size={20} />
              </View>
            </TouchableNativeFeedback>
            <Gap width={10} />
            <TouchableNativeFeedback useForeground onPress={onPressEdit}>
              <View style={styles.btnEdit}>
                <Icon name="pencil" color={'white'} size={20} />
                <Gap width={10} />
                <Text style={{color: 'white'}}>Edit</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textDesc: {
    color: 'white',
    paddingHorizontal: 20,
  },
  viewBtnOption: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  btnDelete: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9A4242',
    elevation: 3,
    overflow: 'hidden',
  },
  btnEdit: {
    height: 35,
    backgroundColor: '#164877',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingRight: 20,
    borderRadius: 35 / 2,
    elevation: 3,
    overflow: 'hidden',
  },
  textItemTitle: {
    flex: 1,
    color: 'white',
    textAlign: 'right',
    marginHorizontal: 20,
    marginVertical: 30,
    fontSize: 22,
    fontWeight: 'bold',
  },
  btnDetail: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000004d',
  },
  viewItem: {
    marginHorizontal: 30,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'white',
    paddingHorizontal: 5,
  },
});

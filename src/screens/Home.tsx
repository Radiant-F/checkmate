import {
  FlatList,
  Text,
  TouchableNativeFeedback,
  View,
  Platform,
  UIManager,
  LayoutAnimation,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Background,
  Gap,
  RenderTask,
  ModalAddTask,
  ModalEditTask,
  Header,
} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeNavigationProps} from '../routes/config';
import axios, {isAxiosError} from 'axios';
import {stylesScreen} from '../styles';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type TaskType = {
  title: string;
  desc: string;
  checked: boolean;
  _id: string;
};

export default function Home({
  route,
  navigation,
}: HomeNavigationProps): React.JSX.Element {
  const token = route.params.token;
  const [openDetail, setOpenDetail] = useState<null | number>(null);

  const instance = axios.create({
    baseURL: 'https://todo-api-omega.vercel.app/api/v1',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const [tasks, setTasks] = useState<Array<TaskType>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  async function getTasks() {
    setLoading(true);
    try {
      const {data} = await instance.get('/todos');
      setTasks(data.data.todos);
      setLoading(false);
    } catch (error) {
      console.log('ERROR:', error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getTasks();
  }, []);

  const [modalAddVisible, setModalAddVisible] = useState<boolean>(false);
  const [loadingAdd, setLoadingAdd] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const closeModal = () => setModalAddVisible(false);
  async function createTask() {
    setLoadingAdd(true);
    try {
      await instance.post('/todos', {title, desc});
      getTasks();
      setLoadingAdd(false);
      setModalAddVisible(false);
      setTitle('');
      setDesc('');
    } catch (error) {
      if (isAxiosError(error)) {
        ToastAndroid.show(error.response?.data.message, ToastAndroid.LONG);
      }
      setLoadingAdd(false);
    }
  }

  const [modalEditVisible, setModalEditVisible] = useState<boolean>(false);
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false);
  const [editedTask, setEditedTask] = useState<TaskType>({
    title: '',
    desc: '',
    checked: false,
    _id: '',
  });
  const closeModalEdit = () => setModalEditVisible(false);
  async function updateTask() {
    setLoadingEdit(true);
    try {
      await instance.put(`/todos/${editedTask._id}`, editedTask);
      getTasks();
      setLoadingEdit(false);
      setModalEditVisible(false);
    } catch (error) {
      console.log('ERROR:', error);
      setLoadingEdit(false);
    }
  }

  function deleteTask(id: string) {
    Alert.alert(
      'Hapus Tugas?',
      'Tindakan tidak bisa diulang.',
      [
        {
          text: 'Batal',
        },
        {
          text: 'Hapus',
          onPress: async () => {
            setLoading(true);
            try {
              await instance.delete(`/todos/${id}`);
              getTasks();
            } catch (error) {
              console.log('ERROR:', error);
              setLoading(true);
            }
          },
        },
      ],
      {cancelable: true},
    );
  }

  async function checklistTask(task: TaskType) {
    setLoading(true);
    try {
      await instance.put(`/todos/${task._id}`, {
        checked: !task.checked,
      });
      getTasks();
    } catch (error) {
      console.log('ERROR:', error);
      setLoading(true);
    }
  }

  return (
    <View style={{flex: 1}}>
      <Background />

      <View style={stylesScreen.containerHome}>
        {/* Header */}
        <Header token={token} navigation={navigation} />

        <Gap height={20} />

        <View style={stylesScreen.viewLine} />

        {/* view data */}
        <FlatList
          data={tasks}
          refreshing={loading}
          onRefresh={() => getTasks()}
          ListFooterComponent={<Gap height={30} />}
          ListHeaderComponent={<Gap height={30} />}
          ListEmptyComponent={
            <Text style={stylesScreen.textEmpty}>Tidak ada tugas</Text>
          }
          renderItem={({item, index}) => {
            const handleOpenDetail = () => {
              LayoutAnimation.easeInEaseOut();
              setOpenDetail(index == openDetail ? null : index);
            };
            const open = openDetail == index;
            return (
              <RenderTask
                item={item}
                onCheckBox={() => checklistTask(item)}
                onPressDelete={() => deleteTask(item._id)}
                onPressDetail={handleOpenDetail}
                onPressEdit={() => {
                  setModalEditVisible(true);
                  setEditedTask(item);
                }}
                open={open}
              />
            );
          }}
        />

        {/* button add */}
        <View style={stylesScreen.viewLine} />
        <TouchableNativeFeedback
          useForeground
          onPress={() => setModalAddVisible(true)}>
          <View style={stylesScreen.btnAddTask}>
            <Icon name="plus-circle-outline" color={'white'} size={22} />
            <Gap width={5} />
            <Text style={stylesScreen.textBtnTitle}>Tambah</Text>
          </View>
        </TouchableNativeFeedback>

        <Gap height={30} />

        {/* modal add */}
        <ModalAddTask
          loading={loadingAdd}
          onChangeDesc={setDesc}
          onChangeTitle={setTitle}
          onPressSubmit={createTask}
          onRequestClose={closeModal}
          visible={modalAddVisible}
          valueDesc={desc}
          valueTitle={title}
        />

        {/* modal edit */}
        <ModalEditTask
          loading={loadingEdit}
          onChangeDesc={desc => setEditedTask({...editedTask, desc})}
          onChangeTitle={title => setEditedTask({...editedTask, title})}
          onPressSubmit={updateTask}
          onRequestClose={closeModalEdit}
          valueDesc={editedTask.desc}
          valueTitle={editedTask.title}
          visible={modalEditVisible}
        />
      </View>
    </View>
  );
}

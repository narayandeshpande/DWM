import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Checkbox from 'expo-checkbox';

type TodoType = {
  id: number;
  description: string;
  completed: boolean;
};

const Todo = () => {
  const [todo, setTodo] = useState<TodoType[]>([]);
  const [todoText, setTodoText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await AsyncStorage.getItem('my-todo');
        if (todos !== null) {
          setTodo(JSON.parse(todos));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);

  const deleteTodo = async (id: number) => {
    try {
      const newtodo = todo.filter((todo) => todo.id !== id);
      await AsyncStorage.setItem('my-todo', JSON.stringify(newtodo));
      setTodo(newtodo);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async () => {
    if (!todoText.trim()) return;
    try {
      const newTodo = {
        id: Math.random(),
        description: todoText,
        completed: false,
      };
      const updated = [...todo, newTodo];
      setTodo(updated);
      await AsyncStorage.setItem('my-todo', JSON.stringify(updated));
      setTodoText('');
      setModalVisible(false);
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  };

  const handelDone = async (id: number) => {
    try {
      const newTodo = todo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      await AsyncStorage.setItem('my-todo', JSON.stringify(newTodo));
      setTodo(newTodo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.heading}>Todos</Text>
      </View>

      <Text style={styles.count}>{todo.filter((t) => !t.completed).length}</Text>

      <FlatList
        data={[...todo].reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem todo={item} deleteTodo={deleteTodo} handelTodo={handelDone} />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <AntDesign name="pluscircle" size={60} color="#4fc5c5" />
      </TouchableOpacity>

      {/* Add Todo Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Add New Todo</Text>
            <TextInput
              placeholder="Write your todo..."
              placeholderTextColor="#aaa"
              style={styles.modalInput}
              value={todoText}
              onChangeText={setTodoText}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={addTodo} style={styles.addBtn}>
                <Text style={styles.btnText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const TodoItem = ({
  todo,
  deleteTodo,
  handelTodo,
}: {
  todo: TodoType;
  deleteTodo: (id: number) => void;
  handelTodo: (id: number) => void;
}) => (
  <View style={styles.todoCard}>
    <View style={styles.todoInfo}>
      <Checkbox value={todo.completed} onValueChange={() => handelTodo(todo.id)} />
      <Text
        style={[
          styles.todoText,
          todo.completed && { textDecorationLine: 'line-through', color: '#999' },
        ]}
      >
        {todo.description}
      </Text>
    </View>
    <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
      <AntDesign name="delete" size={24} color="red" />
    </TouchableOpacity>
  </View>
);

export default Todo;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  heading: {
    color: '#FFF',
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'ARIAL',
  },
  count: {
    color: 'white',
    paddingLeft: 25,
    marginBottom: 10,
  },
  todoCard: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    color: 'white',
    flexShrink: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  // Modal styles
  modalView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    margin: 30,
    borderRadius: 20,
    padding: 20,
    elevation: 10,
  },
  modalHeading: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalInput: {
    backgroundColor: '#2C2C2C',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addBtn: {
    backgroundColor: '#4fc5c5',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  cancelBtn: {
    backgroundColor: '#666',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";
import Checkbox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";

type TodoType = {
  id: number;
  description: string;
  completed: boolean;
  date: string; // yyyy-mm-dd
};

const Todo = () => {
  const [todo, setTodo] = useState<TodoType[]>([]);
  const [todoText, setTodoText] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // date picker for filtering todos
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Load todos
  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await AsyncStorage.getItem("my-todo");
        if (todos !== null) {
          setTodo(JSON.parse(todos));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);

  // Save todos
  const saveTodos = async (newTodos: TodoType[]) => {
    try {
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      setTodo(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  // Add new todo
  const addTodo = async () => {
    if (!todoText.trim()) return;
    try {
      const formattedDate = selectedDate.toISOString().split("T")[0]; // yyyy-mm-dd
      const newTodo: TodoType = {
        id: Math.random(),
        description: todoText,
        completed: false,
        date: formattedDate,
      };
      const updated = [...todo, newTodo];
      saveTodos(updated);
      setTodoText("");
      setModalVisible(false);
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete todo
  const deleteTodo = (id: number) => {
    const updated = todo.filter((t) => t.id !== id);
    saveTodos(updated);
  };

  // Toggle completed
  const handelDone = (id: number) => {
    const updated = todo.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    saveTodos(updated);
  };

  // Filter todos by selected date
  const filteredTodos = todo
    .filter((t) => t.date === selectedDate.toISOString().split("T")[0])
    .reverse();

  return (
    <SafeAreaView style={styles.main}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Daily Todos</Text>

        {/* Calendar button */}
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <AntDesign name="calendar" size={28} color="#4fc5c5" />
        </TouchableOpacity>

        {/* Task count */}
        <Text style={styles.countText}>
          <AntDesign name="profile" size={18} color="#fff" />{" "}
          {todo.filter((t) => !t.completed).length}
        </Text>
      </View>

      {/* Show only selected date's todos */}
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            deleteTodo={deleteTodo}
            handelTodo={handelDone}
          />
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            🎉 No todos for {selectedDate.toDateString()}!
          </Text>
        }
      />

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <AntDesign name="pluscircle" size={66} color="#4fc5c5" />
      </TouchableOpacity>

      {/* Add Todo Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <AntDesign
              name="form"
              size={40}
              color="#4fc5c5"
              style={{ alignSelf: "center", marginBottom: 3 }}
            />
            <Text style={styles.modalHeading}>Add New Todo</Text>
            <TextInput
              placeholder="Write your todo..."
              placeholderTextColor="#aaa"
              style={styles.modalInput}
              value={todoText}
              onChangeText={setTodoText}
              maxLength={50}
            />

            {/* Date Picker Button */}
            <TouchableOpacity
              style={styles.dateBtn}
              onPress={() => setShowDatePicker(true)}
            >
              <AntDesign
                name="calendar"
                size={18}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.btnText}>{selectedDate.toDateString()}</Text>
            </TouchableOpacity>

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={addTodo} style={styles.addBtn}>
                <AntDesign
                  name="checkcircleo"
                  size={20}
                  color="#fff"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.btnText}>Add</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelBtn}
              >
                <AntDesign
                  name="closecircleo"
                  size={20}
                  color="#fff"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Global Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setSelectedDate(date);
          }}
        />
      )}
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
  <View
    style={[
      styles.todoCard,
      todo.completed && { backgroundColor: "#23272f", opacity: 0.5 },
    ]}
  >
    <View style={styles.todoInfo}>
      <Checkbox
        value={todo.completed}
        onValueChange={() => handelTodo(todo.id)}
        color={todo.completed ? "#27ae60" : "#4fc5c5"}
      />
      <Text
        style={[
          styles.todoText,
          todo.completed && {
            textDecorationLine: "line-through",
            color: "#818181",
          },
        ]}
      >
        {todo.description}
      </Text>
    </View>
    <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
      <AntDesign
        name="delete"
        size={25}
        color="#e74c3c"
        style={{ marginRight: 8 }}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handelTodo(todo.id)}>
      <AntDesign
        name={todo.completed ? "checkcircle" : "clockcircleo"}
        size={24}
        color={todo.completed ? "#27ae60" : "#aaa"}
        style={{ marginLeft: 8 }}
      />
    </TouchableOpacity>
  </View>
);

export default Todo;

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: "#121212" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderColor: "#292e39",
    backgroundColor: "rgba(18,18,18,0.95)",
    elevation: 5,
  },
  heading: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
    flex: 1,
  },
  countText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 12,
    paddingVertical: 6,
  },
  todoCard: {
    backgroundColor: "#22252c",
    marginHorizontal: 18,
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 8,
  },
  todoInfo: { flexDirection: "row", alignItems: "center", flex: 1 },
  todoText: { fontSize: 17, color: "white", flexShrink: 1, marginLeft: 8 },
  fab: {
    position: "absolute",
    bottom: 35,
    right: 30,
    elevation: 15,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(13,13,22,0.92)",
  },
  modalContent: {
    backgroundColor: "#23272f",
    margin: 32,
    borderRadius: 26,
    padding: 25,
    elevation: 15,
  },
  modalHeading: {
    fontSize: 21,
    color: "#4fc5c5",
    marginBottom: 19,
    textAlign: "center",
    fontWeight: "bold",
  },
  modalInput: {
    backgroundColor: "#292b3a",
    color: "#fff",
    padding: 15,
    borderRadius: 12,
    fontSize: 17,
    marginBottom: 18,
  },
  dateBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4fc5c5",
    padding: 10,
    borderRadius: 10,
    marginBottom: 22,
    justifyContent: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 18,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4fc5c5",
    paddingVertical: 11,
    paddingHorizontal: 34,
    borderRadius: 11,
  },
  cancelBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#666",
    paddingVertical: 11,
    paddingHorizontal: 10,
    borderRadius: 11,
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#aaa",
    fontSize: 16,
  },
});

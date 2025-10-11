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
import DateTimePicker from "@react-native-community/datetimepicker";
import LinearGradient from "react-native-linear-gradient";

type TodoType = {
  id: number;
  description: string;
  completed: boolean;
  notCompleted: boolean;
  date: string;
};

const Todo = () => {
  const [todo, setTodo] = useState<TodoType[]>([]);
  const [todoText, setTodoText] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await AsyncStorage.getItem("my-todo");
        if (todos) setTodo(JSON.parse(todos));
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);

  const saveTodos = async (newTodos: TodoType[]) => {
    try {
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      setTodo(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async () => {
    if (!todoText.trim()) return;
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const newTodo: TodoType = {
      id: Math.random(),
      description: todoText,
      completed: false,
      notCompleted: false,
      date: formattedDate,
    };
    saveTodos([...todo, newTodo]);
    setTodoText("");
    setModalVisible(false);
    Keyboard.dismiss();
  };

  const deleteTodo = (id: number) => {
    saveTodos(todo.filter((t) => t.id !== id));
  };

  const toggleCompleted = (id: number) => {
    saveTodos(
      todo.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed, notCompleted: false }
          : t
      )
    );
  };

  const toggleNotCompleted = (id: number) => {
    saveTodos(
      todo.map((t) =>
        t.id === id
          ? { ...t, notCompleted: !t.notCompleted, completed: false }
          : t
      )
    );
  };

  const filteredTodos = todo.filter(
    (t) => t.date === selectedDate.toISOString().split("T")[0]
  );

  const pendingTodos = filteredTodos.filter(
    (t) => !t.completed && !t.notCompleted
  );
  const completedTodos = filteredTodos.filter((t) => t.completed);
  const notCompletedTodos = filteredTodos.filter((t) => t.notCompleted);

  // Combine pending + completed for main list
  const mainTodos = [...pendingTodos, ...completedTodos];

  return (
    <SafeAreaView style={styles.main}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Daily Todos</Text>

        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={{ marginRight: 16 }}
        >
          <AntDesign name="calendar" size={28} color="#4fc5c5" />
        </TouchableOpacity>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.countText}>
            <AntDesign name="profile" size={18} color="#fff" /> {pendingTodos.length}
          </Text>

          <TouchableOpacity
            style={{ marginLeft: 12 }}
            onPress={() => setModalVisible(true)}
          >
            <LinearGradient
              colors={["#4fc5c5", "#27ae60"]}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="plus" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Todos (Pending + Completed) */}
      {mainTodos.length > 0 && (
        <FlatList
          data={mainTodos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TodoItem
              todo={item}
              deleteTodo={deleteTodo}
              toggleCompleted={toggleCompleted}
              toggleNotCompleted={toggleNotCompleted}
            />
          )}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      )}

      {/* Not Completed Todos (Separate Section Only if exists) */}
      {notCompletedTodos.length > 0 && (
        <View style={[styles.section, { borderTopWidth: 0.5, borderTopColor: "#333" }]}>
          <FlatList
            data={notCompletedTodos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TodoItem
                todo={item}
                deleteTodo={deleteTodo}
                toggleCompleted={toggleCompleted}
                toggleNotCompleted={toggleNotCompleted}
              />
            )}
          />
        </View>
      )}

      {/* Add Todo Modal */}
      <Modal
        animationType="slide"
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
              style={{ alignSelf: "center", marginBottom: 10 }}
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

            <TouchableOpacity
              style={styles.dateBtn}
              onPress={() => setShowDatePicker(true)}
            >
              <AntDesign
                name="calendar"
                size={18}
                color="#fff"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.btnText}>{selectedDate.toDateString()}</Text>
            </TouchableOpacity>

            <View style={styles.modalButtons}>
              <LinearGradient
                colors={["#4fc5c5", "#27ae60"]}
                style={styles.addBtn}
              >
                <TouchableOpacity
                  onPress={addTodo}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <AntDesign
                    name="checkcircleo"
                    size={20}
                    color="#fff"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.btnText}>Add</Text>
                </TouchableOpacity>
              </LinearGradient>

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

      {/* Date Picker */}
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
  toggleCompleted,
  toggleNotCompleted,
}: {
  todo: TodoType;
  deleteTodo: (id: number) => void;
  toggleCompleted: (id: number) => void;
  toggleNotCompleted: (id: number) => void;
}) => (
  <View
    style={[
      styles.todoCard,
      (todo.completed || todo.notCompleted) && { backgroundColor: "#1e1f26", opacity: 0.7 },
    ]}
  >
    <Text
      style={[
        styles.todoText,
        (todo.completed || todo.notCompleted) && { textDecorationLine: "line-through", color: "#818181" },
      ]}
    >
      {todo.description}
    </Text>

    <View style={styles.todoActions}>
      <TouchableOpacity onPress={() => toggleCompleted(todo.id)} style={styles.actionBtn}>
        <AntDesign name="checkcircle" size={26} color={todo.completed ? "#4fc5c5" : "#27ae60"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleNotCompleted(todo.id)} style={styles.actionBtn}>
        <AntDesign name="closecircle" size={26} color={todo.notCompleted ? "#4fc5c5" : "#e74c3c"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => deleteTodo(todo.id)} style={styles.actionBtn}>
        <AntDesign name="delete" size={26} color="#f39c12" />
      </TouchableOpacity>
    </View>
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
  heading: { color: "#fff", fontSize: 32, fontWeight: "bold", flex: 1 },
  countText: { color: "#fff", fontWeight: "bold", fontSize: 15, marginLeft: 12 },
  section: { flex: 1 },
  todoCard: {
    backgroundColor: "#22252c",
    marginHorizontal: 18,
    marginVertical: 8,
    padding: 16,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 8,
  },
  todoText: { fontSize: 17, color: "white", flex: 1, flexShrink: 1 },
  todoActions: { flexDirection: "row", alignItems: "center" },
  actionBtn: { marginHorizontal: 6 },
  modalView: { flex: 1, justifyContent: "center", backgroundColor: "rgba(13,13,22,0.92)" },
  modalContent: { backgroundColor: "#23272f", margin: 24, borderRadius: 26, padding: 25, elevation: 15 },
  modalHeading: { fontSize: 21, color: "#4fc5c5", marginBottom: 19, textAlign: "center", fontWeight: "bold" },
  modalInput: { backgroundColor: "#292b3a", color: "#fff", padding: 15, borderRadius: 12, fontSize: 17, marginBottom: 18 },
  dateBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "#4fc5c5", padding: 10, borderRadius: 12, marginBottom: 22, justifyContent: "center" },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", gap: 18 },
  addBtn: { flex: 1, borderRadius: 12, justifyContent: "center", alignItems: "center", paddingVertical: 12 },
  cancelBtn: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#666", paddingVertical: 12, borderRadius: 12 },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { WorkContext } from '../context/WorkContext';
const AddNoteModal = ({ setModalVisible, note }: any) => {
  const [heading, setHeading] = useState(note ? note.heading : '');
  const [content, setContent] = useState(note ? note.content : '');
  const { notes, addNote } = useContext(WorkContext);

  const currentDateTime = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const [date, setDate] = useState(note ? note.date : currentDateTime);

  const handelEdit = () => {
    const updateNotes = notes.map((ele) =>
      ele.id === note.id ? { ...ele, heading, content } : ele
    );
    addNote(updateNotes);
    setModalVisible(false);
  };

  const handleSave = () => {
    if (heading.trim() || content.trim()) {
      const newNote = {
        id: Math.random(),
        heading,
        content,
        date,
      };
      addNote([...notes, newNote]);
      setHeading('');
      setContent('');
      setModalVisible(false);
    }
  };

  const handelDeleteNote = (note: any) => {
    const filtterNotes = notes.filter((ele) => ele.id !== note.id);
    addNote(filtterNotes);

    setModalVisible(false)
    Alert.alert('Note Deleted');
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <AntDesign name="arrowleft" size={26} color="white" />
        </TouchableOpacity>
        <View style={styles.topIcons}>
          {note && (
            <TouchableOpacity
              style={styles.iconSpacing}
              onPress={() => handelDeleteNote(note)}
            >
              <AntDesign name="delete" size={26} color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={note ? handelEdit : handleSave}>
            <AntDesign name="check" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Date display */}
      <Text style={styles.noteMeta}>{currentDateTime}</Text>

      {/* Heading Input */}
      <TextInput
        style={styles.headingInput}
        placeholder="Heading"
        placeholderTextColor="#555"
        value={heading}
        onChangeText={setHeading}
      />

      {/* Content Input */}
      <TextInput
        style={styles.contentInput}
        placeholder="Write something..."
        placeholderTextColor="#555"
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
      />
    </View>
  );
};

export default AddNoteModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Pure black background
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginRight: 20,
  },
  noteMeta: {
    color: '#888',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 15,
  },
  headingInput: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    color: 'white',
  },
});

import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AddNoteModal from '../components/AddNoteModal'
import { WorkContext } from '../context/WorkContext'
import NoteCard from '../components/NoteCard'

const Note = () => {
  const [show, setShow] = useState(false)
  const [note, setNote] = useState(null)

  const { notes, getAllNotes } = useContext(WorkContext)


  useEffect(() => {
    getAllNotes()
  }, [])

  return (
    <SafeAreaView style={styles.main}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Notes</Text>
        <Text style={styles.count}>{notes.length}</Text>
      </View>

      {/* Placeholder for list of notes */}
      <ScrollView contentContainerStyle={styles.noteList}>
        {
          notes.map((note, index) => (
            <TouchableOpacity key={index}
              onPress={() => {
                setShow(true)
                setNote(note)
              }}
            >
              <NoteCard note={note} />
            </TouchableOpacity>
          ))
        }
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab}
        onPress={() => {
          setShow(true)
          setNote(null)

        }}
      >
        <AntDesign name="pluscircle" size={60} color="#4fc5c5" />
      </TouchableOpacity>

      <Modal
        animationType='slide'
        transparent={true}
        visible={show}
        onRequestClose={() => setShow(false)}
      >
        <AddNoteModal setModalVisible={setShow} note={note} />

      </Modal>
    </SafeAreaView>
  )
}

export default Note

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#121212',
  },
  count: {
    color: 'white',
    marginBottom: 10
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  heading: {
    color: '#FFFF',
    fontSize: 35,
    fontFamily: 'ARIAL',
    fontWeight: 'bold',
  },
  noteList: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",

  },
  noteCard: {
    backgroundColor: '#1e1e1e',
    marginVertical: 8,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    alignSelf: 'flex-end', // aligns to the right
    maxWidth: '80%',
  },
  noteText: {
    color: 'white',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    zIndex: 10,
  },
})

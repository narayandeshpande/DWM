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
        <View style={styles.counterContainer}>
          <Text style={styles.count}>{notes.length}</Text>
        </View>
      </View>

      {/* Notes List */}
      <ScrollView contentContainerStyle={styles.noteList}>
        {notes.map((note, index) => (
          <TouchableOpacity key={index}
            onPress={() => {
              setShow(true)
              setNote(note)
            }}
            style={styles.noteItem}
          >
            <NoteCard note={note} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab}
        onPress={() => {
          setShow(true)
          setNote(null)
        }}
      >
        <AntDesign name="pluscircle" size={56} color="#00e0b7" style={styles.fabIcon} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    paddingTop: 40,
    paddingBottom: 18,
  },
  heading: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  counterContainer: {
    backgroundColor: '#23272f',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  count: {
    color: '#00e0b7',
    fontSize: 18,
    fontWeight: '700',
  },
  noteList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 90,
    gap: 8,
  },
  noteItem: {
    width: '48%',  // Two items per row with some spacing
    marginBottom: 12,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 38,
    backgroundColor: '#23272f',
    borderRadius: 40,
    elevation: 8,
    shadowColor: "#00e0b7",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    width: 62,
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIcon: {},
})

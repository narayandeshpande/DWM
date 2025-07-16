import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NoteCard = ({ note }:any) => {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>{note.heading}</Text>
      <Text style={styles.text}>{note.content}</Text>
    </View>
  )
}

export default NoteCard

const styles = StyleSheet.create({
  card: {
    height:150,
    width:150,
    backgroundColor: '#1e1e1e',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    maxWidth: '80%',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  heading:{
     color: 'white',
    fontSize: 20,
    fontWeight:"bold"
  }
})

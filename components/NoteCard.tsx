import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NoteCard = ({ note }) => (
  <View style={styles.card}>
    <Text style={styles.heading} numberOfLines={1} ellipsizeMode="tail">
      {note.heading}
    </Text>
    <View style={styles.divider} />
    <Text style={styles.text} numberOfLines={6} ellipsizeMode="tail">
      {note.content}
    </Text>
  </View>
)

export default NoteCard

const styles = StyleSheet.create({
  card: {
    height: 180,            // Fixed height for all cards
    // width: '48%',           // Two cards per row as before
    backgroundColor: '#121212',
    padding: 16,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16.0,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#2b2f38',
    overflow: 'hidden',
    justifyContent: 'flex-start',
    // marginBottom: 12,
    
  },
  heading: {
    color: '#e4e4e7',
    fontSize: 19,
    fontWeight: '500',
    marginBottom: 8,
    letterSpacing: 0.2,
    textShadowColor: '#182025',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  divider: {
    height: 2,
    backgroundColor: '#27303b',
    borderRadius: 2,
    marginBottom: 10,
    width: 40,
    alignSelf: 'flex-start',
    opacity: 0.7,
  },
  text: {
    color: '#e4e4e7',
    fontSize: 15,
    fontWeight: '300',
    lineHeight: 21,
    opacity: 0.92,
    marginBottom: 10,
  },
})

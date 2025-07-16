import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

const ExpenditureDetails = ({ expenditures, total }: any) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>💸 Expenditure Details</Text>

      {expenditures.length === 0 && (
        <Text style={styles.textCenter}>
          No Expenditure Details are available in this month.
        </Text>
      )}

      {expenditures.map((item: any, index: number) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>{item.reason}</Text>
          <Text style={styles.text}>💰 Amount: ₹{item.amount}</Text>
          <Text style={styles.text}>📅 Date: {item.date}</Text>

          <View style={styles.statusBox}>
            <Text style={styles.statusText}>📤 Recorded</Text>
          </View>
        </View>
      ))}

      {expenditures.length > 0 && (
        <View style={styles.totalBox}>
          <Text style={styles.totalText}>🧾 Total Spent: ₹{total}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default ExpenditureDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  textCenter: {
    color: '#AAAAAA',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 6,
  },
  text: {
    color: '#CCCCCC',
    fontSize: 15,
    marginBottom: 4,
  },
  statusBox: {
    marginTop: 10,
    backgroundColor: '#E53935',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 13,
  },
  totalBox: {
    marginTop: 10,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    paddingBottom: 30,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EF9A9A',
  },
});

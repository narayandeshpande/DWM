import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

const IncomeDetails = ({ incomes, total }: any) => {
  const getPaymentInfo = (mode: string) => {
    switch (mode.toLowerCase()) {
      case 'cash':
        return { icon: '💵', label: 'Cash', color: '#66BB6A' };
      case 'online':
        return { icon: '💳', label: 'Online', color: '#42A5F5' };
      default:
        return { icon: '❓', label: 'Unknown', color: 'orange' };
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>📈 Income Details</Text>

      {incomes.length === 0 && (
        <Text style={styles.textCenter}>
          No Income Details are available in this month.
        </Text>
      )}

      {incomes.map((income: any, index: number) => {
        console.log(income)
        const payment = getPaymentInfo(income.paymentMode?income.paymentMode:income.paymentStatus);
        return (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{income.name}</Text>
            <Text style={styles.text}>💰 Amount: ₹{income.amount}</Text>
            <Text style={styles.text}>📅 Date: {income.date}</Text>
            <Text style={[styles.text, { color: payment.color }]}>
              {payment.icon} Mode: {payment.label}
            </Text>
            <View style={[styles.statusBox]}>
              <Text style={styles.statusText}>📥 Recorded</Text>
            </View>
          </View>
        );
      })}

      {incomes.length > 0 && (
        <View style={styles.totalBox}>
          <Text style={styles.totalText}>🔢 Total Income: ₹{total}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default IncomeDetails;
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
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 14,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
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
  textCenter: {
    color: '#AAAAAA',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  statusBox: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
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
    color: '#81D4FA',
  },
});

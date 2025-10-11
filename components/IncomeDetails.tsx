import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useContext } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { WorkContext } from '../context/WorkContext';

const IncomeDetails = ({ incomes, total}: any) => {
  const { deleteIncome } = useContext(WorkContext);
  // Sort incomes by date
  const sortedIncomes = [...incomes].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const getPaymentInfo = (mode: string) => {
    switch (mode.toLowerCase()) {
      case 'cash':
        return { icon: <AntDesign name="wallet" size={16} color="#66BB6A" />, label: 'Cash', color: '#66BB6A' };
      case 'online':
        return { icon: <AntDesign name="creditcard" size={16} color="#42A5F5" />, label: 'Online', color: '#42A5F5' };
      default:
        return { icon: <AntDesign name="questioncircleo" size={16} color="orange" />, label: 'Unknown', color: 'orange' };
    }
  };

  const handleDelete = (income: any) => {
    Alert.alert(
      'Delete Income',
      'Are you sure you want to delete this income?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>{deleteIncome(income)},
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>📈 Income Details</Text>

      {sortedIncomes.length === 0 && (
        <Text style={styles.textCenter}>
          No Income Details are available in this month.
        </Text>
      )}

      {sortedIncomes.map((income: any, index: number) => {
        const payment = getPaymentInfo(income.paymentMode ? income.paymentMode : income.paymentStatus);
        return (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>
              <AntDesign name="user" size={18} color="#fff" /> {income.name}
            </Text>

            <Text style={styles.text}>
              <AntDesign name="wallet" size={16} color="#FFD700" />  Amount: ₹{income.amount}
            </Text>

            <Text style={styles.text}>
              <AntDesign name="calendar" size={16} color="#90CAF9" />  Date: {income.date}
            </Text>

            <Text style={[styles.text, { color: payment.color }]}>
              {payment.icon}  Mode: {payment.label}
            </Text>

            <View style={styles.statusBox}>
              <Text style={styles.statusText}>
                <AntDesign name="checkcircle" size={14} color="#fff" /> Recorded
              </Text>
            </View>

            {/* Delete Button at bottom-right */}
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => handleDelete(income)}
            >
              <AntDesign name="delete" size={14} color="#fff" />
              <Text style={styles.deleteText}> Delete</Text>
            </TouchableOpacity>
          </View>
        );
      })}

      {incomes.length > 0 && (
        <View style={styles.totalBox}>
          <Text style={styles.totalText}>
            <AntDesign name="linechart" size={18} color="#81D4FA" />  Total Income: ₹{total}
          </Text>
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
    position: 'relative', // Needed for absolute Delete button
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
    marginBottom: 6,
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
  deleteBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    backgroundColor: '#D32F2F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
    marginLeft: 4,
  },
});

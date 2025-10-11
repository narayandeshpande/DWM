import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useContext } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { WorkContext } from '../context/WorkContext';

const ExpenditureDetails = ({ expenditures, total, }: any) => {
  const { deleteExpenditure } = useContext(WorkContext);

  const sortedExpenditures = [...expenditures].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const getPaymentInfo = (mode: string) => {
    switch (mode.toLowerCase()) {
      case 'cash':
        return { icon: <AntDesign name="wallet" size={16} color="#66BB6A" />, text: 'Cash', color: '#66BB6A' };
      case 'online':
        return { icon: <AntDesign name="creditcard" size={16} color="#42A5F5" />, text: 'Online', color: '#42A5F5' };
      default:
        return { icon: <AntDesign name="questioncircleo" size={16} color="orange" />, text: 'Unknown', color: 'orange' };
    }
  };

  const handleDelete = (item: any) => {
    Alert.alert(
      'Delete Expenditure',
      'Are you sure you want to delete this expenditure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>{deleteExpenditure(item)},
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headingRow}>
        <AntDesign name="pay-circle1" size={26} color="#FFB74D" />
        <Text style={styles.heading}>Expenditure Details</Text>
      </View>

      {sortedExpenditures.length === 0 && (
        <Text style={styles.noDataText}>
          No Expenditure Details are available in this month.
        </Text>
      )}

      {sortedExpenditures.map((item: any, index: number) => {
        const payment = getPaymentInfo(item.expenditureMode);

        return (
          <View key={index} style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.reason}</Text>
              <Text style={styles.text}>
                <AntDesign name="dollar" size={14} color="#EF9A9A" /> Amount: ₹{item.amount}
              </Text>
              <Text style={styles.text}>
                <AntDesign name="calendar" size={14} color="#90CAF9" /> Date: {item.date}
              </Text>
              <Text style={[styles.text, { color: payment.color }]}>
                {payment.icon} Mode: {payment.text}
              </Text>

              <View style={styles.statusBox}>
                <AntDesign name="checkcircle" size={14} color="#fff" />
                <Text style={styles.statusText}> Recorded</Text>
              </View>
            </View>

            {/* Delete button at bottom-right */}
            <TouchableOpacity
              onPress={() => handleDelete(item)}
              style={styles.deleteBtn}
            >
              <AntDesign name="delete" size={18} color="#fff" />
              <Text style={styles.deleteText}> Delete</Text>
            </TouchableOpacity>
          </View>
        );
      })}

      {sortedExpenditures.length > 0 && (
        <View style={styles.totalBox}>
          <AntDesign name="barschart" size={16} color="#EF9A9A" />
          <Text style={styles.totalText}> Total Spent: ₹{total}</Text>
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
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  noDataText: {
    color: '#CCCCCC',
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 14,
    padding: 16,
    marginBottom: 15,
    position: 'relative', // for absolute positioning of delete button
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
  statusBox: {
    marginTop: 10,
    backgroundColor: '#E53935',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 13,
    marginLeft: 4,
  },
  totalBox: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#333',
    paddingVertical: 12,
    paddingBottom: 30,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EF9A9A',
    marginLeft: 6,
  },
  deleteBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    backgroundColor: '#D32F2F',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
});

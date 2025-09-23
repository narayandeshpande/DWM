import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ExpenditureDetails = ({ expenditures, total }: any) => {

  // Sort expenditures by date (newest first)
  const sortedExpenditures = [...expenditures].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headingRow}>
        <AntDesign name="pay-circle1" size={26} color="#FFB74D" />
        <Text style={styles.heading}>Expenditure Details</Text>
      </View>

      {sortedExpenditures.length === 0 && (
        <Text style={styles.textCenter}>
          No Expenditure Details are available in this month.
        </Text>
      )}

      {sortedExpenditures.map((item: any, index: number) => {
        const payment = getPaymentInfo(item.expenditureMode);

        return (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{item.reason}</Text>
            <Text style={styles.text}>
              <AntDesign name="dollar" size={14} color="#EF9A9A" /> Amount: ₹{item.amount}
            </Text>
            <Text style={styles.text}>
              <AntDesign name="calendar" size={14} color="#90CAF9" /> Date: {item.date}
            </Text>
            <Text style={[styles.text, { color: payment.color }]}>
              {payment.icon} Mode: {payment.label}
            </Text>

            <View style={styles.statusBox}>
              <AntDesign name="checkcircle" size={14} color="#fff" />
              <Text style={styles.statusText}> Recorded</Text>
            </View>
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
    flexDirection: 'row',
    alignItems: 'center',
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
});

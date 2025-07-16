import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import InputWithDropdown from './InputWithDropdown';

const WorkDetails = ({ allWorks }: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [element, setElement] = useState(null);

  const handleUpdatePayment = (item: any) => {
    setElement(item);
  };
  useEffect(() => {
    if (element) {
      setShowAlert(true);
    }
  }, [element]);

  const getPaymentDisplay = (status: string) => {
    switch (status) {
      case 'cash':
        return { text: '💵 Cash', color: 'lightgreen' };
      case 'online':
        return { text: '💻 Online', color: '#42A5F5' };
      case 'pending':
      default:
        return { text: '⏳ Pending', color: 'orange' };
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>📋 Work Details</Text>

      {allWorks.length === 0 && (
        <Text style={styles.noDataText}>
          No Work Details are available in this month.
        </Text>
      )}

      {allWorks.map((ele: any, index: number) => {
        const paymentDisplay = getPaymentDisplay(ele.paymentStatus);

        return (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{ele.name}</Text>
            <Text style={styles.text}>📍 {ele.address}</Text>
            <Text style={styles.text}>📅 {ele.date}</Text>
            <Text style={styles.text}>⏰ {ele.time}</Text>
            <Text style={styles.text}>❓ {ele.who_has_it}</Text>
            <Text style={styles.text}>💵 ₹{ele.money}</Text>

            {/* 💰 Payment Status Line */}
            <Text style={styles.text}>
              💰 Payment:{' '}
              <Text style={{ color: paymentDisplay.color }}>
                {paymentDisplay.text}
              </Text>
            </Text>

            {/* Bottom Row: Status + Update Button */}
            <View style={styles.bottomRow}>
              <View
                style={[
                  styles.statusBox,
                  ele.completed
                    ? { backgroundColor: '#4CAF50' }
                    : ele.canceled
                      ? { backgroundColor: '#F44336' }
                      : { backgroundColor: '#FFC107' },
                ]}
              >
                <Text style={styles.statusText}>
                  {ele.completed
                    ? '✅ Completed'
                    : ele.canceled
                      ? '❌ Canceled'
                      : '⏳ Pending'}
                </Text>
              </View>

              {ele.paymentStatus === 'pending' && (
                <TouchableOpacity
                  style={styles.updateBtn}
                  onPress={() => handleUpdatePayment(ele)}
                >
                  <Text style={styles.updateText}>💱 Update Payment</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      })}

      {/* Modal to Update Payment */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showAlert}
        onRequestClose={() => setShowAlert(false)}
      >
        <InputWithDropdown
          onClose={() => setShowAlert(false)}
          element={element}
        />
      </Modal>
    </ScrollView>
  );
};

export default WorkDetails;
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
  noDataText: {
    color: '#CCCCCC',
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  text: {
    color: '#CCCCCC',
    fontSize: 15,
    marginBottom: 3,
  },
  bottomRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBox: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  statusText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  updateBtn: {
    backgroundColor: '#3949AB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  updateText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 13,
  },
});

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
import AntDesign from 'react-native-vector-icons/AntDesign';

const WorkDetails = ({ allWorks }: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [element, setElement] = useState(null);

  const handleUpdatePayment = (item: any) => {
    setElement(item);
  };

  useEffect(() => {
    if (element) setShowAlert(true);
  }, [element]);

  const getPaymentDisplay = (status: string) => {
    switch (status) {
      case 'cash':
        return { icon: <AntDesign name="wallet" size={16} color="#66BB6A" />, text: 'Cash', color: '#66BB6A' };
      case 'online':
        return { icon: <AntDesign name="creditcard" size={16} color="#42A5F5" />, text: 'Online', color: '#42A5F5' };
      case 'pending':
      default:
        return { icon: <AntDesign name="clockcircleo" size={16} color="orange" />, text: 'Pending', color: 'orange' };
    }
  };

  // Sort works by date (earliest first)
  const sortedWorks = [...allWorks].sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headingRow}>
        <AntDesign name="profile" size={26} color="#81D4FA" />
        <Text style={styles.heading}>Work Details</Text>
      </View>

      {sortedWorks.length === 0 && (
        <Text style={styles.noDataText}>
          No Work Details are available in this month.
        </Text>
      )}

      {sortedWorks.map((ele: any, index: number) => {
        const paymentDisplay = getPaymentDisplay(ele.paymentStatus);

        return (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <AntDesign name="user" size={18} color="#FFD700" />
              <Text style={styles.title}>{ele.name}</Text>
            </View>

            <Text style={styles.text}>
              <AntDesign name="pushpin" size={14} color="#FF8A65" /> {ele.address}
            </Text>
            <Text style={styles.text}>
              <AntDesign name="calendar" size={14} color="#90CAF9" /> {ele.date}
            </Text>
            <Text style={styles.text}>
              <AntDesign name="clockcircleo" size={14} color="#FFD54F" /> {ele.time}
            </Text>
            <Text style={styles.text}>
              <AntDesign name="questioncircleo" size={14} color="#FF7043" /> {ele.who_has_it}
            </Text>
            <Text style={styles.text}>
              <AntDesign name="wallet" size={14} color="#66BB6A" /> ₹{ele.money}
            </Text>

            <Text style={[styles.text, { color: paymentDisplay.color }]}>
              {paymentDisplay.icon} Payment: {paymentDisplay.text}
            </Text>

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
                    ? <><AntDesign name="checkcircle" size={14} color="#fff" /> Completed</>
                    : ele.canceled
                    ? <><AntDesign name="closecircle" size={14} color="#fff" /> Canceled</>
                    : <><AntDesign name="clockcircleo" size={14} color="#fff" /> Pending</>}
                </Text>
              </View>

              {ele.paymentStatus === 'pending' && ele.completed && (
                <TouchableOpacity
                  style={styles.updateBtn}
                  onPress={() => handleUpdatePayment(ele)}
                >
                  <AntDesign name="edit" size={14} color="#fff" />
                  <Text style={styles.updateText}> Update Payment</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      })}

      <Modal
        animationType="fade"
        transparent={true}
        visible={showAlert}
        onRequestClose={() => setShowAlert(false)}
      >
        <InputWithDropdown onClose={() => setShowAlert(false)} element={element} />
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 6,
  },
  text: {
    color: '#CCCCCC',
    fontSize: 15,
    marginBottom: 4,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  updateBtn: {
    flexDirection: 'row',
    backgroundColor: '#3949AB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  updateText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 13,
  },
});

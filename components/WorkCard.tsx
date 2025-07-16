import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import AddWorkModel from './AddWorkModel';
import { WorkContext } from '../context/WorkContext';
import InputWithDropdown from './InputWithDropdown';

const WorkCard = ({ data }: any) => {
  const [modelVisible, setModelVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { allWorks, updateAllWorks, updateIncome, incomes }: any =
    useContext(WorkContext);

  // ✅ Compare work date with today's date
  const isTodayOrPast = (workDate: string) => {
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
    const formattedWorkDate = new Date(workDate).toISOString().split('T')[0];
    return today >= formattedWorkDate;
  };

  const handleCompleteWork = async (paymentStatus: any) => {
    const updatedWorks = allWorks.map((ele: any) => {
      if (ele.id === data.id) {
        const updated = {
          ...ele,
          completed: true,
          canceled: false,
          paymentStatus: paymentStatus,
        };

        // If payment is not pending, add income entry
        if (paymentStatus !== 'pending') {
          const newIncome = {
            id: Math.random(),
            name: ele.name,
            amount: ele.money,
            date: ele.date,
            paymentStatus: paymentStatus,
          };
          updateIncome([...incomes, newIncome]);
        }

        return updated;
      }
      return ele;
    });

    await updateAllWorks(updatedWorks);
  };

  const handleCancelWork = () => {
    const updatedWorks = allWorks.map((ele: any) =>
      ele.id === data.id ? { ...ele, canceled: true, completed: false } : ele
    );
    updateAllWorks(updatedWorks);
    Alert.alert('Cancelled', 'Work has been cancelled.');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.subtext}>📍 {data.address}</Text>
        <Text style={styles.subtext}>📅 {data.date}</Text>
        <Text style={styles.subtext}>⏰ {data.time}</Text>
        <Text style={styles.subtext}>❓ {data.who_has_it}</Text>
        <Text style={styles.subtext}>💵 ₹{data.money}</Text>

        {/* Payment Status Badge */}
        <View
          style={[
            styles.badgeContainer,
            {
              backgroundColor:
                data.paymentStatus === 'pending' ? '#FFF3E0' : '#E8F5E9',
            },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              {
                color:
                  data.paymentStatus === 'pending' ? '#FB8C00' : '#43A047',
              },
            ]}
          >
            {data.paymentStatus === 'pending'
              ? '⏳ Payment Pending'
              : '✅ Payment Received'}
          </Text>
        </View>

        {/* Work Status */}
        <View style={styles.status}>
          {data.completed && (
            <Text style={[styles.statusText, { color: '#4CAF50' }]}>
              ✅ Work Completed
            </Text>
          )}
          {data.canceled && (
            <Text style={[styles.statusText, { color: '#F44336' }]}>
              ❌ Work Cancelled
            </Text>
          )}
          {!data.completed && !data.canceled && (
            <Text style={[styles.statusText, { color: '#FFC107' }]}>
              🕒 Work Pending
            </Text>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          {/* ✅ Only show Complete button if date is today or past and work not done */}
          {isTodayOrPast(data.date) && !data.completed && !data.canceled && (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#4CAF50' }]}
              onPress={() => setShowAlert(true)}
            >
              <Text style={styles.buttonText}>Complete</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#F44336' }]}
            onPress={handleCancelWork}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#2196F3' }]}
            onPress={() => setModelVisible(true)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modelVisible}
        onRequestClose={() => setModelVisible(false)}
      >
        <AddWorkModel
          setModelVisible={setModelVisible}
          data={data}
          edit={true}
        />
      </Modal>

      {/* Dropdown Modal (like Alert) */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showAlert}
        onRequestClose={() => setShowAlert(false)}
      >
        <InputWithDropdown
          onClose={() => setShowAlert(false)}
          handleCompleteWork={handleCompleteWork}
        />
      </Modal>
    </View>
  );
};

export default WorkCard;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#1E1E1E',
    width: '92%',
    padding: 16,
    borderRadius: 14,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 6,
  },
  subtext: {
    color: '#CCCCCC',
    fontSize: 14,
    marginVertical: 1,
  },
  badgeContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 6,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  status: {
    marginTop: 10,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

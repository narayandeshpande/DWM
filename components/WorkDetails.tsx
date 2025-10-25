import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import React, { useContext, useState } from 'react';
import InputWithDropdown from './InputWithDropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { WorkContext } from '../context/WorkContext';

const WorkDetails = ({ allWorks }: any) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [showBrahminModal, setShowBrahminModal] = useState(false);
  const [selectedBrahmins, setSelectedBrahmins] = useState<string[]>([]);
  const { deleteWork } = useContext(WorkContext);

  const handleUpdatePayment = (work: any) => {
    setSelectedWork(work);
    setShowPaymentModal(true);
  };

  const handleDelete = (work: any) => {
    Alert.alert(
      'Delete Work',
      'Are you sure you want to delete this work?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteWork(work) },
      ],
      { cancelable: true }
    );
  };

  const handleBrahminPress = (brahmins: string[]) => {
    setSelectedBrahmins(brahmins);
    setShowBrahminModal(true);
  };

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
        <Text style={styles.noDataText}>No Work Details are available in this month.</Text>
      )}

      {sortedWorks.map((work: any, index: number) => {
        const paymentDisplay = getPaymentDisplay(work.paymentStatus);

        return (
          <View key={index} style={styles.card}>
            {/* Top Row: Name + Update Payment Button */}
            <View style={styles.topRow}>
              <View style={styles.cardHeader}>
                <AntDesign name="user" size={18} color="#FFD700" />
                <Text style={styles.title}>{work.name}</Text>
              </View>
              {work.paymentStatus === 'pending' && work.workStatus === 'Complete' && (
                <TouchableOpacity style={styles.updateBtnTop} onPress={() => handleUpdatePayment(work)}>
                  <AntDesign name="edit" size={14} color="#fff" />
                  <Text style={styles.updateText}> Update Payment</Text>
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.text}>
              <AntDesign name="pushpin" size={14} color="#FF8A65" /> {work.address}
            </Text>
            <Text style={styles.text}>
              <AntDesign name="calendar" size={14} color="#90CAF9" /> {work.date}
            </Text>
            <Text style={styles.text}>
              <AntDesign name="clockcircleo" size={14} color="#FFD54F" /> {work.time}
            </Text>
            <Text style={styles.text}>
              <AntDesign name="questioncircleo" size={14} color="#FF7043" /> {work.who_has_it}
            </Text>
            <Text style={styles.text}>
              <AntDesign name="wallet" size={14} color="#66BB6A" /> ₹{work.money}
            </Text>

            <Text style={[styles.text, { color: paymentDisplay.color }]}>
              {paymentDisplay.icon} Payment: {paymentDisplay.text}
            </Text>

            {/* Brahmin Dropdown */}
            {work.brahmins && work.brahmins.length > 0 && (
              <TouchableOpacity style={styles.brahminButton} onPress={() => handleBrahminPress(work.brahmins)}>
                <Text style={styles.brahminText}>View Assigned Brahmins</Text>
                <AntDesign name="down" size={14} color="#FFD54F" />
              </TouchableOpacity>
            )}

            <View style={styles.bottomRow}>
              <View
                style={[
                  styles.statusBox,
                  work.workStatus === 'Complete'
                    ? { backgroundColor: '#4CAF50' }
                    : work.workStatus === 'Cancel'
                      ? { backgroundColor: '#F44336' }
                      : { backgroundColor: '#FFC107' },
                ]}
              >
                <AntDesign
                  name={
                    work.workStatus === 'Complete'
                      ? 'checkcircle'
                      : work.workStatus === 'Cancel'
                        ? 'closecircle'
                        : 'clockcircleo'
                  }
                  size={14}
                  color="#fff"
                />
                <Text style={styles.statusText}>
                  {work.workStatus === 'Complete'
                    ? ' Completed'
                    : work.workStatus === 'Cancel'
                      ? ' Canceled'
                      : ' Pending'}
                </Text>
              </View>

              <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(work)}>
                <AntDesign name="delete" size={14} color="#fff" />
                <Text style={styles.updateText}> Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}

      {/* Payment Modal */}
      <Modal animationType="fade" transparent={true} visible={showPaymentModal} onRequestClose={() => setShowPaymentModal(false)}>
        <InputWithDropdown onClose={() => setShowPaymentModal(false)} element={selectedWork} />
      </Modal>

      {/* Brahmin Modal */}
      <Modal animationType="fade" transparent={true} visible={showBrahminModal} onRequestClose={() => setShowBrahminModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.brahminModal}>
            <Text style={styles.modalTitle}>Assigned Brahmins</Text>
            <ScrollView style={{ maxHeight: 200 }}>
              {selectedBrahmins.map((b, idx) => (
                <Text key={idx} style={styles.brahminName}>
                  {idx + 1}. {b}
                </Text>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowBrahminModal(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default WorkDetails;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingHorizontal: 15, paddingTop: 20 },
  headingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  heading: { fontSize: 26, fontWeight: 'bold', color: '#ffffff', marginLeft: 8 },
  noDataText: { color: '#CCCCCC', fontSize: 16, marginTop: 12, textAlign: 'center' },
  card: { backgroundColor: '#1E1E1E', borderRadius: 14, padding: 16, marginBottom: 15 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '600', color: '#ffffff', marginLeft: 6 },
  text: { color: '#CCCCCC', fontSize: 15, marginBottom: 4 },
  bottomRow: { marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusBox: { borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center' },
  statusText: { color: '#ffffff', fontWeight: '600', fontSize: 14 },
  updateBtnTop: { flexDirection: 'row', backgroundColor: '#3949AB', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, alignItems: 'center' },
  updateText: { color: '#ffffff', fontWeight: '600', fontSize: 13 },
  deleteBtn: { flexDirection: 'row', backgroundColor: '#D32F2F', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, alignItems: 'center' },

  // Brahmin Dropdown Styles
  brahminButton: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 8, backgroundColor: '#2E2E2E', borderRadius: 12, marginVertical: 6 },
  brahminText: { color: '#FFD54F', fontSize: 14, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  brahminModal: { width: '80%', backgroundColor: '#1C1C1C', borderRadius: 20, padding: 20 },
  modalTitle: { color: '#FFD54F', fontSize: 18, fontWeight: '700', marginBottom: 12 },
  brahminName: { color: '#FFFFFF', fontSize: 16, paddingVertical: 6, borderBottomColor: '#333', borderBottomWidth: 1 },
  closeBtn: { marginTop: 12, alignSelf: 'center', backgroundColor: '#FFD54F', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 8 },
  closeText: { color: '#000', fontWeight: '700' },
});

import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, { useContext, useState } from 'react';
import AddWorkModel from './AddWorkModel';
import { WorkContext } from '../context/WorkContext';
import InputWithDropdown from './InputWithDropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

type workType = {
  id: number;
  name: string;
  date: string;
  time: string;
  address: string;
  completed: boolean;
  canceled: boolean;
  who_has_it?: string;
  money?: string;
  paymentStatus?: string;
  workStatus?: string;
  brahmins?: string[];
};

const { height } = Dimensions.get('window');

const GradientButton = ({ colors, onPress, iconName, title }:any) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    style={{ flex: 1, borderRadius: 10, overflow: 'hidden' }}
  >
    <LinearGradient colors={colors} style={styles.button}>
      <AntDesign name={iconName} size={18} color="white" />
      <Text style={styles.buttonText}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const WorkCard = ({ data }: { data: workType }) => {
  const [modelVisible, setModelVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showBrahminDropdown, setShowBrahminDropdown] = useState(false);
  const { allWorks, updateAllWorks, updateIncome, incomes }: any =
    useContext(WorkContext);

  const isTodayOrPast = (workDate: string) => {
    const today = new Date().toISOString().split('T')[0];
    const formattedWorkDate = new Date(workDate).toISOString().split('T')[0];
    return today >= formattedWorkDate;
  };

  const handleCompleteWork = async (paymentStatus: any) => {
    const updatedWorks = allWorks.map((ele: any) => {
      if (ele.id === data.id) {
        const updated = {
          ...ele,
          workStatus: "Complete",
          paymentStatus: paymentStatus,
        };

        if (paymentStatus !== 'pending') {
          const newIncome = {
            id: data.id,
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
      ele.id === data.id ? { ...ele, workStatus: "Cancel" } : ele
    );
    updateAllWorks(updatedWorks);
    Alert.alert('Cancelled', 'Work has been cancelled.');
  };

  return (
    <>
      {data ? (
        <View style={styles.wrapper}>
          <LinearGradient colors={['#1C1C1C', '#121212']} style={styles.card}>
            {/* Title */}
            <View style={styles.headerRow}>
              <AntDesign name="profile" size={22} color="#FFD54F" />
              <Text style={styles.title}>{data?.name ?? ""}</Text>
            </View>

            {/* Info */}
            <View style={styles.infoRow}>
              <AntDesign name="enviromento" size={16} color="#FF7043" />
              <Text style={styles.subtext}>{data?.address ?? ""}</Text>
            </View>
            <View style={styles.infoRow}>
              <AntDesign name="calendar" size={16} color="#66BB6A" />
              <Text style={styles.subtext}>{data?.date ?? ""}</Text>
            </View>
            <View style={styles.infoRow}>
              <AntDesign name="clockcircleo" size={16} color="#29B6F6" />
              <Text style={styles.subtext}>{data?.time ?? ""}</Text>
            </View>
            <View style={styles.infoRow}>
              <AntDesign name="user" size={16} color="#AB47BC" />
              <Text style={styles.subtext}>{data?.who_has_it ?? ""}</Text>
            </View>

            {/* Brahmin Dropdown */}
            {data?.brahmins && data.brahmins.length > 0 && (
              <TouchableOpacity
                style={styles.brahminDropdownButton}
                onPress={() => setShowBrahminDropdown(true)}
              >
                <Text style={styles.brahminDropdownText}>View Assigned Brahmins</Text>
                <AntDesign name="down" size={14} color="#FFD54F" />
              </TouchableOpacity>
            )}

            <View style={styles.infoRow}>
              <AntDesign name="wallet" size={16} color="#FFB300" />
              <Text style={styles.subtext}>₹{data?.money ?? ""}</Text>
            </View>

            {/* Payment Status Badge */}
            <View
              style={[
                styles.badgeContainer,
                {
                  backgroundColor:
                    data?.paymentStatus === 'pending' ? '#FFF3E0' : '#E8F5E9',
                },
              ]}
            >
              <AntDesign
                name={
                  data?.paymentStatus === 'pending'
                    ? 'exclamationcircle'
                    : 'checkcircle'
                }
                size={14}
                color={data?.paymentStatus === 'pending' ? '#FB8C00' : '#43A047'}
              />

              <View>
                <Text
                  style={[
                    styles.badgeText,
                    {
                      color:
                        data?.paymentStatus === 'pending' ? '#FB8C00' : '#43A047',
                    },
                  ]}
                >
                  {data?.paymentStatus === 'pending'
                    ? 'Payment Pending'
                    : 'Payment Received'}
                </Text>

                {data?.paymentStatus === 'cash' || data?.paymentStatus === 'online' ? (
                  <Text style={{ color: '#616161', fontSize: 12 }}>
                    Mode: {data?.paymentStatus === 'cash' ? 'Cash' : 'Online'}
                  </Text>
                ) : null}
              </View>
            </View>

            {/* Work Status */}
            <View style={styles.status}>
              {data.workStatus === "Complete" && (
                <Text style={[styles.statusText, { color: '#4CAF50' }]}>
                  ✅ Work Completed
                </Text>
              )}
              {data.workStatus === "Cancel" && (
                <Text style={[styles.statusText, { color: '#F44336' }]}>
                  ❌ Work Cancelled
                </Text>
              )}
              {data.workStatus === "Pending" && (
                <Text style={[styles.statusText, { color: '#FFC107' }]}>
                  🕒 Work Pending
                </Text>
              )}
            </View>

            {/* Action Buttons */}
            {data.workStatus === "Pending" &&
              <View style={styles.buttonRow}>
                {isTodayOrPast(data?.date ?? "") && !data?.completed && !data?.canceled && (
                  <GradientButton
                    colors={['#66bb6a', '#43a047']}
                    onPress={() => setShowAlert(true)}
                    iconName="check"
                    title="Complete"
                  />
                )}

                <GradientButton
                  colors={['#e53935', '#b71c1c']}
                  onPress={handleCancelWork}
                  iconName="close"
                  title="Cancel"
                />

                <GradientButton
                  colors={['#1e88e5', '#1565c0']}
                  onPress={() => setModelVisible(true)}
                  iconName="edit"
                  title="Edit"
                />
              </View>
            }
          </LinearGradient>

          {/* Edit Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modelVisible}
            onRequestClose={() => setModelVisible(false)}
          >
            <AddWorkModel setModelVisible={setModelVisible} data={data} edit={true} />
          </Modal>

          {/* Dropdown Modal */}
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

          {/* Brahmin Names Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={showBrahminDropdown}
            onRequestClose={() => setShowBrahminDropdown(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.brahminModal}>
                <Text style={styles.modalTitle}>Assigned Brahmins</Text>
                <ScrollView style={{ maxHeight: 200 }}>
                  {data.brahmins?.map((b, index) => (
                    <Text key={index} style={styles.brahminName}>
                      {index + 1}. {b}
                    </Text>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowBrahminDropdown(false)}
                >
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <Text>Work not available</Text>
      )}
    </>
  );
};

export default WorkCard;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  card: {
    width: '92%',
    minHeight: height * 0.55,
    padding: 22,
    borderRadius: 20,
    backgroundColor: '#121212',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFD54F',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 4,
  },
  subtext: {
    color: '#BBBBBB',
    fontSize: 16,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  badgeText: {
    fontSize: 15,
    fontWeight: '700',
  },
  status: {
    marginTop: 18,
    marginBottom: 14,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 22,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 5,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 1,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
    flexShrink: 1,
    textAlign: 'center',
  },
  brahminDropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
    backgroundColor: '#2E2E2E',
    borderRadius: 12,
    marginVertical: 6,
    alignSelf: 'flex-start',
  },
  brahminDropdownText: {
    color: '#FFD54F',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brahminModal: {
    width: '80%',
    backgroundColor: '#1C1C1C',
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    color: '#FFD54F',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  brahminName: {
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 6,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  closeButton: {
    marginTop: 12,
    alignSelf: 'center',
    backgroundColor: '#FFD54F',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  closeText: {
    color: '#000',
    fontWeight: '700',
  },
});

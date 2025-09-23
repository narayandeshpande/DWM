import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import React, { useContext, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { WorkContext } from '../context/WorkContext';
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AddIncome = ({ setIncomeModel }: any) => {
  const [dateAndTime, setDateAndTime] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const { incomes, updateIncome } = useContext(WorkContext);

  const showMode = (current: 'date' | 'time') => {
    setShowPicker(true);
    setMode(current);
  };

  const onChange = (event: any, selectedDate: any) => {
    if (event.type === 'set') {
      const current = selectedDate || dateAndTime;
      setDateAndTime(current);
      const onlyDate = current.toISOString().split('T')[0];
      setDate(onlyDate);
    }
    setShowPicker(false);
  };

  const handleAddIncome = () => {
    if (!name || !amount || !date) {
      Alert.alert('Missing Information', 'Please fill out all fields.');
      return;
    }
    const newIncome = {
      id: Math.random(),
      name,
      amount,
      paymentMode,
      date,
    };
    console.log(newIncome);
    updateIncome([...incomes, newIncome]);
    setIncomeModel(false);
    setName('');
    setAmount('');
    setPaymentMode('Cash');
    setDate('');
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>Add Income</Text>

        <View style={styles.inputWrapper}>
          <AntDesign name="profile" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Income Source"
            placeholderTextColor="#888"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputWrapper}>
          <AntDesign name="creditcard" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Amount"
            placeholderTextColor="#888"
            keyboardType="numeric"
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <View style={styles.pickerWrapper}>
          <AntDesign name="swap" size={20} color="#888" style={styles.icon} />
          <Picker
            selectedValue={paymentMode}
            onValueChange={(itemValue) => setPaymentMode(itemValue)}
            style={styles.picker}
            dropdownIconColor="#888"
          >
            <Picker.Item label="Cash" value="Cash" />
            <Picker.Item label="Online" value="Online" />
          </Picker>
        </View>

        <TouchableOpacity style={[styles.inputWrapper,{padding:20}]} onPress={() => showMode('date')}>
          <AntDesign name="calendar" size={20} color={date ? '#fff' : '#888'} style={styles.icon} />
          <Text style={date ? styles.inputText : styles.inputPlaceholder}>
            {date || 'Select Date'}
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <Pressable style={[styles.button, { backgroundColor: '#4CAF50' }]} onPress={handleAddIncome}>
            <AntDesign name="pluscircle" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>

          <Pressable style={[styles.button, { backgroundColor: '#F44336' }]} onPress={() => setIncomeModel(false)}>
            <AntDesign name="closecircleo" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>

        {showPicker && (
          <DateTimePicker value={dateAndTime} mode={mode} display="default" onChange={onChange} />
        )}
      </View>
    </View>
  );
};

export default AddIncome;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
  },
  modal: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    marginBottom: 14,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingVertical: 12,
    fontSize: 16,
  },
  inputPlaceholder: {
    color: '#888',
    fontSize: 16,
  },
  inputText: {
    color: '#fff',
    fontSize: 16,
  },
  icon: {
    marginRight: 12,
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    marginBottom: 14,
    paddingHorizontal: 8,
  },
  picker: {
    flex: 1,
    color: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

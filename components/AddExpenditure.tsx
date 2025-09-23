import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, { useContext, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { WorkContext } from '../context/WorkContext';
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AddExpenditure = ({ setExpenditureModel }: any) => {
  const [dateAndTime, setDateAndTime] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const { expenditures, updateExpenditure } = useContext(WorkContext);
  const [expenditureMode, setExpenditureMode] = useState('Cash');

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

  const handleAddExpenditure = () => {
    if (!amount || !date || !name) {
      Alert.alert('Missing Fields', 'Please fill out all fields.');
      return;
    }
    const newExpense = {
      id: Math.random(),
      reason: name,
      expenditureMode,
      amount,
      date,
    };
    updateExpenditure([...expenditures, newExpense]);
    setExpenditureModel(false);
    setName('');
    setDate('');
    setAmount('');
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>Add Expenditure</Text>

        <View style={styles.inputWrapper}>
          <AntDesign name="questioncircleo" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Enter Reason"
            placeholderTextColor="#888"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputWrapper}>
          <AntDesign name="creditcard" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Enter Amount"
            placeholderTextColor="#888"
            style={styles.input}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <View style={styles.pickerWrapper}>
          <AntDesign name="swap" size={20} color="#888" style={styles.icon} />
          <Picker
            selectedValue={expenditureMode}
            onValueChange={(item) => setExpenditureMode(item)}
            style={styles.picker}
          >
            <Picker.Item label="Cash" value="Cash" />
            <Picker.Item label="Online" value="Online" />
          </Picker>
        </View>

        <TouchableOpacity style={[styles.inputWrapper,  { padding: 20 }]} onPress={() => showMode('date')}>
          <AntDesign name="calendar" size={20} color={date ? '#fff' : '#888'} style={styles.icon} />
          <Text style={date ? styles.inputText : styles.inputPlaceholder}>
            {date || 'Select Date'}
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.button, { backgroundColor: '#4CAF50' }]}
            onPress={handleAddExpenditure}
          >
            <AntDesign name="pluscircle" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>

          <Pressable
            style={[styles.button, { backgroundColor: '#F44336' }]}
            onPress={() => setExpenditureModel(false)}
          >
            <AntDesign name="closecircleo" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>

        {showPicker && (
          <DateTimePicker
            value={dateAndTime}
            mode={mode}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </View>
  );
};

export default AddExpenditure;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
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
    marginTop: 8,
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

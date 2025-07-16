import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useContext, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { WorkContext } from '../context/WorkContext';

const AddWorkModel = ({ setModelVisible, data, edit }: any) => {
  const [dateAndTime, setDateAndTime] = useState(new Date());
  const [date, setDate] = useState(data ? data.date : '');
  const [time, setTime] = useState(data ? data.time : '');
  const [name, setName] = useState(data ? data.name : '');
  const [address, setAddress] = useState(data ? data.address : '');
  const [money,setMoney]=useState(data?data.money:"")
  const [who_has_it,setWho_has_it]=useState(data?data.who_has_it:"")
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const { allWorks, updateAllWorks }: any = useContext(WorkContext);

  const showMode = (current: 'date' | 'time') => {
    setShowPicker(true);
    setMode(current);
  };

  const onChange = (event: any, selectedDate: any) => {
    if (event.type === 'set') {
      const current = selectedDate || dateAndTime;
      setDateAndTime(current);

      const onlyDate = current.toISOString().split('T')[0];
      const onlyTime = current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setDate(onlyDate);
      setTime(onlyTime);
    }
    setShowPicker(false);
  };

  const handleAddWork = async () => {
    if (!name || !date || !time || !address) {
      Alert.alert('Missing Fields', 'Please fill out all fields.');
      return;
    }

    const newWork = {
      id: Math.random(),
      name,
      date,
      time,
      address,
      who_has_it,
      money,
      completed: false,
      canceled: false,
      paymentStatus:'pending'
    };
    console.log(newWork)
    updateAllWorks([...allWorks, newWork]);
    resetForm();
  };

  const handleEditWork = async () => {
    const updatedWork = allWorks.map((ele: any) =>
      ele.id === data.id
        ? { ...ele, name, date, time, address,who_has_it,money }
        : ele
    );
    updateAllWorks(updatedWork);
    Alert.alert('Success', 'Work updated successfully');
    resetForm();
  };

  
  const resetForm = () => {
    setModelVisible(false);
    setName('');
    setAddress('');
    setDate('');
    setTime('');
    setWho_has_it('')
    setMoney('')
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.modalOverlay}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{edit ? 'Edit Work' : 'Add Your Work'}</Text>

        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="Who has it?"
          value={who_has_it}
          onChangeText={setWho_has_it}
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="Money"
          value={money}
          keyboardType="numeric"
          onChangeText={setMoney}
          style={styles.input}
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.input} onPress={() => showMode('date')}>
          <Text style={date ? styles.inputTextDark : styles.inputPlaceholder}>
            {date || 'Select Date'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.input} onPress={() => showMode('time')}>
          <Text style={time ? styles.inputTextDark : styles.inputPlaceholder}>
            {time || 'Select Time'}
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.button, { backgroundColor: '#4CAF50' }]}
            onPress={edit ? handleEditWork : handleAddWork}
          >
            <Text style={styles.buttonText}>{edit ? 'Update' : 'Add'}</Text>
          </Pressable>

          <Pressable
            style={[styles.button, { backgroundColor: '#FF5252' }]}
            onPress={() => setModelVisible(false)}
          >
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
    </KeyboardAvoidingView>
  );
};

export default AddWorkModel;


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2C2C2E',
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
    color: 'white',
  },
  inputPlaceholder: {
    color: '#888',
    fontSize: 16,
  },
  inputTextDark: {
    color: '#ffffff',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

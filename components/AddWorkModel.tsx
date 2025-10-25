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
  FlatList,
} from 'react-native';
import React, { useContext, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { WorkContext } from '../context/WorkContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';

const AddWorkModel = ({ setModelVisible, data, edit }: any) => {
  const [dateAndTime, setDateAndTime] = useState(new Date());
  const [date, setDate] = useState(data ? data.date : '');
  const [time, setTime] = useState(data ? data.time : '');
  const [name, setName] = useState(data ? data.name : '');
  const [address, setAddress] = useState(data ? data.address : '');
  const [money, setMoney] = useState(data ? data.money : '');
  const [who_has_it, setWho_has_it] = useState(data ? data.who_has_it : '');
  const [anotherName, setAnotherName] = useState(data ? data.anotherName || '' : '');

  // 🌟 Brahmin List
  const [brahminName, setBrahminName] = useState('');
  const [brahmins, setBrahmins] = useState(data ? data.brahmins || [] : []);

  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');

  const { allWorks, updateAllWorks }: any = useContext(WorkContext);

  const showMode = (current: 'date' | 'time') => {
    setMode(current);
    setShowPicker(true);
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

  // 🌟 Add & Delete Brahmin
  const handleAddBrahmin = () => {
    if (brahminName.trim() === '') return;
    setBrahmins([...brahmins, brahminName.trim()]);
    setBrahminName('');
  };

  const handleDeleteBrahmin = (index: number) => {
    const updated = [...brahmins];
    updated.splice(index, 1);
    setBrahmins(updated);
  };

  const handleAddWork = () => {
    if (!name || !date || !time || !address || !who_has_it) {
      Alert.alert('Missing Fields', 'Please fill out all fields.');
      return;
    }

    const newWork = {
      id: Math.random(),
      name,
      date,
      time,
      address,
      money,
      who_has_it,
      brahmins: who_has_it === 'me' ? brahmins : [],
      anotherName: who_has_it === 'another' ? anotherName : '',
      workStatus: 'Pending',
      paymentStatus: 'pending',
    };
    console.log(newWork)

    updateAllWorks([...allWorks, newWork]);
    resetForm();
  };

  const handleEditWork = () => {
    const updatedWork = allWorks.map((ele: any) =>
      ele.id === data.id
        ? { ...ele, name, date, time, address, money, who_has_it, brahmins, anotherName }
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
    setWho_has_it('');
    setMoney('');
    setBrahmins([]);
    setAnotherName('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.modalOverlay}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{edit ? 'Edit Work' : 'Add Your Work'}</Text>

        {/* Work Name */}
        <View style={styles.inputWrapper}>
          <AntDesign name="profile" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#888"
          />
        </View>

        {/* Who Has It Dropdown */}
        <View style={styles.inputWrapper}>
          <AntDesign name="user" size={20} color="#888" style={styles.icon} />
          <Picker
            selectedValue={who_has_it}
            onValueChange={(value) => setWho_has_it(value)}
            style={styles.picker}
            dropdownIconColor="#fff"
          >
            <Picker.Item label="Select who has it" value="" />
            <Picker.Item label="Me" value="me" />
            <Picker.Item label="Another" value="another" />
          </Picker>
        </View>

        {/* 🌟 If Me → show Brahmin list */}
        {who_has_it === 'me' && (
          <>
            <Text style={styles.sectionTitle}>Brahmin List</Text>

            <View style={styles.inputWrapper}>
              <AntDesign name="user" size={20} color="#888" style={styles.icon} />
              <TextInput
                placeholder="Enter Brahmin name"
                value={brahminName}
                onChangeText={setBrahminName}
                style={styles.input}
                placeholderTextColor="#888"
              />
              <TouchableOpacity onPress={handleAddBrahmin}>
                <AntDesign name="pluscircle" size={24} color="#4CAF50" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={brahmins}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.brahminRow}>
                  <Text style={styles.brahminItem}>• {item}</Text>
                  <TouchableOpacity onPress={() => handleDeleteBrahmin(index)}>
                    <AntDesign name="delete" size={20} color="#FF5252" />
                  </TouchableOpacity>
                </View>
              )}
            />
          </>
        )}

        {/* 🌟 If Another → show text field for that person's name */}
        {who_has_it === 'another' && (
          <View style={styles.inputWrapper}>
            <AntDesign name="user" size={20} color="#888" style={styles.icon} />
            <TextInput
              placeholder="Enter name of who has it"
              value={anotherName}
              onChangeText={setAnotherName}
              style={styles.input}
              placeholderTextColor="#888"
            />
          </View>
        )}

        {/* Address */}
        <View style={styles.inputWrapper}>
          <AntDesign name="home" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
            placeholderTextColor="#888"
          />
        </View>

        {/* Money */}
        <View style={styles.inputWrapper}>
          <AntDesign name="money" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Money"
            value={money}
            keyboardType="numeric"
            onChangeText={setMoney}
            style={styles.input}
            placeholderTextColor="#888"
          />
        </View>

        {/* Date & Time */}
        <TouchableOpacity
          style={[styles.inputWrapper, styles.pickerTouchable]}
          onPress={() => showMode('date')}
        >
          <AntDesign name="calendar" size={20} color={date ? '#fff' : '#888'} style={styles.icon} />
          <Text style={date ? styles.inputTextDark : styles.inputPlaceholder}>
            {date || 'Select Date'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.inputWrapper, styles.pickerTouchable]}
          onPress={() => showMode('time')}
        >
          <AntDesign name="clockcircleo" size={20} color={time ? '#fff' : '#888'} style={styles.icon} />
          <Text style={time ? styles.inputTextDark : styles.inputPlaceholder}>
            {time || 'Select Time'}
          </Text>
        </TouchableOpacity>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.button, { backgroundColor: '#4CAF50' }]}
            onPress={edit ? handleEditWork : handleAddWork}
          >
            <AntDesign name={edit ? 'edit' : 'pluscircle'} size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>{edit ? 'Update' : 'Add'}</Text>
          </Pressable>

          <Pressable
            style={[styles.button, { backgroundColor: '#FF5252' }]}
            onPress={() => setModelVisible(false)}
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    marginBottom: 14,
    paddingHorizontal: 12,
  },
  picker: {
    flex: 1,
    color: '#fff',
  },
  input: {
    flex: 1,
    color: 'white',
    paddingVertical: 12,
    fontSize: 16,
  },
  inputPlaceholder: {
    color: '#888',
    fontSize: 16,
  },
  inputTextDark: {
    color: '#ffffff',
    fontSize: 16,
  },
  icon: {
    marginRight: 12,
  },
  pickerTouchable: {
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 8,
  },
  brahminRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    padding: 8,
    marginBottom: 5,
  },
  brahminItem: {
    color: '#ddd',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
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
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

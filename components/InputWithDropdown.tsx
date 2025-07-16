import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { WorkContext } from '../context/WorkContext';

const InputWithDropdown = ({ onClose, handleCompleteWork, element }: any) => {
  const [selectedOption, setSelectedOption] = useState('online');
  const { allWorks, incomes,updateIncome,updateAllWorks }: any = useContext(WorkContext);
  const updatepaymentstatus = async () => {
    const updatedWorks = allWorks.map((ele: any) => {
      if (ele.id === element.id) {
        const updated = {
          ...ele,
          paymentStatus: selectedOption
        }
        if (selectedOption !== 'pending') {
          const newIncome = {
            id: Math.random(),
            name: ele.name,
            amount: ele.money,
            date: ele.date,
            paymentStatus: selectedOption,
          }
          updateIncome([...incomes,newIncome])
        }
        return updated
      }
      return ele
    })
     await updateAllWorks(updatedWorks);
  }
  return (
    <View style={styles.overlay}>
      <View style={styles.alertBox}>
        <Text style={styles.label}>Select Payment Status:</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedOption}
            onValueChange={(itemValue) => {
              setSelectedOption(itemValue)
            }}
            style={styles.picker}
          >
            <Picker.Item label="Online" value="online" />
            <Picker.Item label="Cash" value="cash" />
            <Picker.Item label="Pending" value="pending" />
          </Picker>
        </View>

        <View style={{ marginTop: 20 }}>
          <Button title="Done" onPress={() => {
            let option = selectedOption
            { handleCompleteWork ? handleCompleteWork(option) : updatepaymentstatus() }
            onClose()

          }} color="#4CAF50" />
        </View>
      </View>
    </View>
  );
};

export default InputWithDropdown;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: '80%',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
    alignItems: 'stretch',
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    color: 'white',
    backgroundColor: '#1e1e1e',
    height: 60,
  },
});

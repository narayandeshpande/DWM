import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddExpenditure from '../components/AddExpenditure';
import AddIncome from '../components/AddIncome';
import AddWorkModel from '../components/AddWorkModel';

const Add = () => {
  const [incomeModal, setIncomeModal] = useState(false);
  const [expenditureModal, setExpenditureModal] = useState(false);
  const [workModal, setWorkModal] = useState(false);

  const handleAddIncome = () => setIncomeModal(true);
  const handleAddExpenditure = () => setExpenditureModal(true);
  const handleAddWork = () => setWorkModal(true);

  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.heading}>Add Your Income, Expenditure & Work</Text>

      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#589B3C' }]}
          onPress={handleAddIncome}
        >
          <Text style={styles.buttonText}>Add Income</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#6946A9' }]}
          onPress={handleAddWork}
        >
          <Text style={styles.buttonText}>Add Work</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#DF3437' }]}
          onPress={handleAddExpenditure}
        >
          <Text style={styles.buttonText}>Add Expenditure</Text>
        </TouchableOpacity>
      </View>

      {/* Income Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={incomeModal}
        onRequestClose={() => setIncomeModal(false)}
      >
        <AddIncome setIncomeModel={setIncomeModal} />
      </Modal>

      {/* Expenditure Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={expenditureModal}
        onRequestClose={() => setExpenditureModal(false)}
      >
        <AddExpenditure setExpenditureModel={setExpenditureModal} />
      </Modal>

      {/* Work Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={workModal}
        onRequestClose={() => setWorkModal(false)}
      >
        <AddWorkModel setModelVisible={setWorkModal} edit={false} />
      </Modal>
    </SafeAreaView>
  );
};

export default Add;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  heading: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '60%',
    marginVertical: 10,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // adds shadow on Android
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { WorkContext } from '../context/WorkContext';
import IncomeDetails from './IncomeDetails';
import WorkDetails from './WorkDetails';
import ExpenditureDetails from './ExpenditureDetails';

const months = [
  { name: 'January', icon: 'carryout', color: ['#6C63FF', '#3A2DFF'] },
  { name: 'February', icon: 'hearto', color: ['#FF4B5C', '#FF1E3C'] },
  { name: 'March', icon: 'enviromento', color: ['#4CAF50', '#2E7D32'] },
  { name: 'April', icon: 'smileo', color: ['#FFD54F', '#FFA000'] },
  { name: 'May', icon: 'barschart', color: ['#FF9800', '#F57C00'] },
  { name: 'June', icon: 'team', color: ['#29B6F6', '#0288D1'] },
  { name: 'July', icon: 'flag', color: ['#00BCD4', '#0097A7'] },
  { name: 'August', icon: 'gift', color: ['#AB47BC', '#6A1B9A'] },
  { name: 'September', icon: 'book', color: ['#8BC34A', '#558B2F'] },
  { name: 'October', icon: 'rocket1', color: ['#FF7043', '#D84315'] },
  { name: 'November', icon: 'star', color: ['#FFC107', '#FF8F00'] },
  { name: 'December', icon: 'bells', color: ['#E53935', '#B71C1C'] },
];

const MonthList = ({ detailType }: any) => {
  const { allWorks, incomes, expenditures } = useContext(WorkContext);

  const [show, setShow] = useState(false);
  const [forWho, setForWho] = useState('');
  const [total, setTotal] = useState(0);
  const [filteredData, setFilteredData] = useState([]);

  const handleMonthPress = (month: string) => {
    let filtered: any[] = [];
    let totalAmount = 0;

    if (detailType === 'income') {
      filtered = incomes.filter((income) => {
        const incomeMonth = new Date(income.date).toLocaleString('default', { month: 'long' });
        if (incomeMonth === month) {
          totalAmount += Number(income.amount);
          return true;
        }
        return false;
      });
      setTotal(totalAmount);
      setFilteredData(filtered);
      setForWho('income');
      setShow(true);
    }

    if (detailType === 'work') {
      filtered = allWorks.filter((work) => {
        const workMonth = new Date(work.date).toLocaleString('default', { month: 'long' });
        return workMonth === month;
      });
      setFilteredData(filtered);
      setForWho('work');
      setShow(true);
    }

    if (detailType === 'expenditure') {
      filtered = expenditures.filter((expenditure) => {
        const expendituresMonth = new Date(expenditure.date).toLocaleString('default', { month: 'long' });
        if (expendituresMonth === month) {
          totalAmount += Number(expenditure.amount);
          return true;
        }
        return false;
      });
      setTotal(totalAmount);
      setFilteredData(filtered);
      setForWho('expenditure');
      setShow(true);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.monthItem, { backgroundColor: item.color[0] }]}
      onPress={() => handleMonthPress(item.name)}
    >
      <View style={[styles.iconCircle, { backgroundColor: item.color[1] }]}>
        <AntDesign name={item.icon} size={28} color="#fff" />
      </View>
      <Text style={styles.monthText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Select a Month</Text>
      <FlatList
        data={months}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={show}
        onRequestClose={() => setShow(false)}
      >
        {forWho === 'income' && <IncomeDetails incomes={filteredData} total={total} />}
        {forWho === 'work' && <WorkDetails allWorks={filteredData} />}
        {forWho === 'expenditure' && <ExpenditureDetails expenditures={filteredData} total={total} />}
      </Modal>
    </View>
  );
};

export default MonthList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  monthItem: {
    borderRadius: 20,
    paddingVertical: 28,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 2 - 24,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  iconCircle: {
    borderRadius: 50,
    padding: 12,
    marginBottom: 12,
  },
  monthText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

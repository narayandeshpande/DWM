import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Alert, Modal } from 'react-native';
import { WorkContext } from '../context/WorkContext';
import IncomeDetails from './IncomeDetails';
import WorkDetails from './WorkDetails';
import ExpenditureDetails from './ExpenditureDetails';

const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
];

const MonthList = ({ detailType }: any) => {
        const { allWorks, incomes, expenditures } = useContext(WorkContext)
        const [show, setShow] = useState(false)
        const [forWho, setForWho] = useState("")
        const[total,setTotal]=useState()
        const [filteredData, setFilteredData] = useState([])

        const handleMonthPress = (month: string) => {
                let filtered = []
                let total=0
                if (detailType === 'income') {
                        filtered = incomes.filter((income) => {
                                const incomeMonth = new Date(income.date).toLocaleString('default', { month: 'long' });
                                 if(incomeMonth=== month){
                                        total+=Number(income.amount)
                                        return incomeMonth === month
                                }
                        })
                        setTotal(total)
                        setFilteredData(filtered)
                        setForWho('income')
                        setShow(true)
                }

                if (detailType === 'work') {
                        filtered = allWorks.filter((work) => {
                                const workMonth = new Date(work.date).toLocaleString('default', { month: "long" })
                                        return workMonth === month
                        })
                       
                        setFilteredData(filtered)
                        setForWho('work')
                        setShow(true)
                }

                if (detailType === 'expenditure') {
                        filtered = expenditures.filter((expenditure) => {
                                const expendituresMonth = new Date(expenditure.date).toLocaleString('default', { month: "long" })
                                if(expendituresMonth=== month){
                                        total+=Number(expenditure.amount)
                                        return expendituresMonth === month
                                }
                        })
                         setTotal(total)
                        setFilteredData(filtered)
                        setForWho('expenditure')
                        setShow(true)
                }
        };


        const renderItem = ({ item }: { item: string }) => (
                <TouchableOpacity style={styles.monthItem} onPress={() => handleMonthPress(item)}>
                        <Text style={styles.monthText}>{item}</Text>
                </TouchableOpacity>
        );

        return (
                <View style={styles.container}>
                        <FlatList
                                data={months}
                                renderItem={renderItem}
                                keyExtractor={(item) => item}
                                numColumns={2}
                                columnWrapperStyle={styles.row}
                                contentContainerStyle={{ paddingBottom: 20 }}
                        />
                        <Modal
                                animationType='slide'
                                transparent={false}
                                visible={show}
                                onRequestClose={() => setShow(false)}
                        >
                                {forWho === 'income' && <IncomeDetails incomes={filteredData} total={total}/>}
                                {forWho === 'work' && <WorkDetails allWorks={filteredData}/>}
                                {forWho === 'expenditure' && <ExpenditureDetails expenditures={filteredData} total={total}/>}

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
        row: {
                justifyContent: 'space-between',
                marginBottom: 16,
        },
        monthItem: {
                backgroundColor: '#6C63FF',
                paddingVertical: 24,
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
                width: Dimensions.get('window').width / 2 - 24,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 6,
                elevation: 4,
        },
        monthText: {
                color: '#fff',
                fontSize: 18,
                fontWeight: '700',
        },
});

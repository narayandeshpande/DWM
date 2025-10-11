import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import WorkCard from '../components/WorkCard'
import { WorkContext } from '../context/WorkContext'
import DateTimePicker from '@react-native-community/datetimepicker'

type workType = {
        id: number;
        name: string;
        date: string;
        time: string;
        address: string;
        completed: boolean;
        canceled: boolean;
};

const Home = () => {
        
        const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
        const [showPicker, setShowPicker] = useState(false)
        const [date, setDate] = useState<string | undefined>(new Date().toISOString().split('T')[0])
        const [todaysPendingWorks, setTodaysPendingWorks] = useState<workType[]>([])
        const { allWorks }: any = useContext(WorkContext)

        allWorks.sort((a: string, b: string) => a.date.localeCompare(b.date))
        

        const onChange = (event: any, date: any) => {
                if (event.type === 'set') {
                        const current = date || selectedDate;
                        setSelectedDate(current);
                        const onlyDate = current.toISOString().split('T')[0];
                        setDate(onlyDate)
                }
                setShowPicker(false);
        };

        useEffect(() => {
                if (!date) return;
                const todays = allWorks.filter((work: any) => work.date === date);
                setTodaysPendingWorks(todays);
        }, [date, allWorks]);


        return (
                <SafeAreaView style={styles.main}>
                        {/* Header */}
                        <View style={styles.header}>
                                <Text style={styles.heading}>Works</Text>

                                {/* Date Picker Button */}
                                <TouchableOpacity
                                        style={styles.dateInput}
                                        onPress={() => setShowPicker(true)}
                                >
                                        <Text style={styles.dateText}>
                                                {selectedDate ? selectedDate.toISOString().split('T')[0] : 'Select Date'}
                                        </Text>
                                </TouchableOpacity>
                        </View>

                        <Text style={styles.count}>{todaysPendingWorks.length}</Text>

                        <ScrollView>
                                {todaysPendingWorks && todaysPendingWorks.map((ele: any, index: number) => (
                                        <WorkCard key={index} data={ele} />
                                ))}
                        </ScrollView>


                        {/* DateTime Picker */}
                        {showPicker && (
                                <DateTimePicker
                                        value={selectedDate || new Date()}
                                        mode="date"
                                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                        onChange={onChange}
                                />
                        )}
                </SafeAreaView>
        )
}

export default Home

const styles = StyleSheet.create({
        main: {
                flex: 1,
                backgroundColor: '#121212'
        },
        header: {
                paddingHorizontal: 20,
                paddingTop: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
        },
        heading: {
                color: "#FFFF",
                fontSize: 35,
                fontFamily: "ARIAL",
                fontWeight: "bold",
        },
        dateInput: {
                backgroundColor: '#1e1e1e',
                borderWidth: 1,
                borderColor: '#4fc5c5',
                borderRadius: 8,
                paddingVertical: 6,
                paddingHorizontal: 10,
        },
        dateText: {
                color: 'white',
                fontSize: 14,
        },
        count: {
                color: 'white',
                paddingLeft: 25,
                marginBottom: 10
        },
        fab: {
                position: 'absolute',
                right: 20,
                bottom: 30,
                zIndex: 10
        },
})

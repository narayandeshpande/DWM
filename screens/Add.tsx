import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddExpenditure from '../components/AddExpenditure'
import AddIncome from '../components/AddIncome'

const Add = () => {
        const [incomeModel, setIncomeModel] = useState(false)
        const [expenditureModel, setExpenditureModel] = useState(false)

        const handelAddIncome = () => {
                setIncomeModel(true)
        }

        const handelAddExpenditure = () => {
                setExpenditureModel(true)
        }

        return (
                <SafeAreaView style={styles.main}>
                        <View><Text style={styles.heading}>ADD Your Income & Expenditure</Text></View>
                        <View style={styles.container}>
                                <TouchableOpacity
                                        style={[styles.button, { backgroundColor: "#589B3C" }]}
                                        onPress={handelAddIncome}
                                >
                                        <Text style={styles.text}>
                                                Add Income
                                        </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                        style={[styles.button, { backgroundColor: "#DF3437" }]}
                                        onPress={handelAddExpenditure}
                                >
                                        <Text style={styles.text}>
                                                Add Expenditure
                                        </Text>
                                </TouchableOpacity>
                        </View>

                        <Modal
                                animationType='slide'
                                transparent={true}
                                visible={incomeModel}
                                onRequestClose={() => setIncomeModel(false)}
                        >
                                <AddIncome setIncomeModel={setIncomeModel}/>
                        </Modal>

                        

                        <Modal
                                animationType='slide'
                                transparent={true}
                                visible={expenditureModel}
                                onRequestClose={() => setExpenditureModel(false)}
                        >
                                <AddExpenditure setExpenditureModel={setExpenditureModel}/>
                        </Modal>


                </SafeAreaView>
        )
}

export default Add

const styles = StyleSheet.create({
        main: {
                flex: 1,
                backgroundColor: '#121212'
        },
        heading: {
                color: "#FFFF",
                fontSize: 30,
                fontFamily: "ARIAL",
                fontWeight: "bold",
                paddingLeft: 20,
                paddingTop: 50
        },
        container: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
        },
        button: {
                width: "40%",
                margin: 10,
                padding: 10,
                alignItems: "center",     // horizontally center text
                justifyContent: "center", // vertically center text
                borderRadius: 5,          // optional: make it look nicer
        },
        text: {
                color: "white",
                fontWeight: "bold",
                fontSize:15
        }

})
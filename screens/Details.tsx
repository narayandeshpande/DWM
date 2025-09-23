import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MonthGrid from '../components/MonthGrid'

const Details = () => {
        const [showWorkDetails, setShowWorkDetails] = useState(false)
        const [showIncomeDetails, setShowIncomeDetails] = useState(false)
        const [showExpenditureDetails, setShowExpenditureDetails] = useState(false)
        const [visible, setVisible] = useState(false)

        const handelWorkDetail = () => {
                setShowExpenditureDetails(false)
                setShowIncomeDetails(false)
                setVisible(true)
                setShowWorkDetails(true)
        }

        const handelIncomeDetail = () => {
                setShowExpenditureDetails(false)
                setShowWorkDetails(false)
                setVisible(true)
                setShowIncomeDetails(true)
        }

        const handelExpenditureDetail = () => {
                setShowIncomeDetails(false)
                setVisible(true)
                setShowWorkDetails(false)
                setShowExpenditureDetails(true)

        }
        return (
                <SafeAreaView style={styles.main}>
                        <View>
                                <Text style={styles.heading}>Details</Text>
                        </View>
                        <View
                                style={styles.container}
                        >
                                <TouchableOpacity style={[styles.buttons, { backgroundColor: "#4CAF50" }]}
                                        onPress={handelIncomeDetail}
                                >
                                        <Text style={styles.buttonText}>Income Details</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.buttons, { backgroundColor: "#2196F3" }]}
                                        onPress={handelWorkDetail}
                                >
                                        <Text style={styles.buttonText}>Work Details</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.buttons, { backgroundColor: "#F44336" }]}
                                        onPress={handelExpenditureDetail}
                                >
                                        <Text style={styles.buttonText}>Expenditure Details</Text>
                                </TouchableOpacity>
                        </View>

                        <Modal
                                animationType='slide'
                                transparent={false}
                                visible={visible}
                                onRequestClose={() => setVisible(false)}
                        >
                                {showWorkDetails &&
                                        <MonthGrid detailType={"work"} />
                                }
                                {showIncomeDetails &&
                                        <MonthGrid detailType={"income"} />
                                }
                                {showExpenditureDetails &&

                                        <MonthGrid detailType={"expenditure"} />
                                }

                        </Modal>
                </SafeAreaView>
        )
}

export default Details

const styles = StyleSheet.create({
        main: {
                flex: 1,
                backgroundColor: '#121212'
        },
        heading: {
                color: "#FFFF",
                fontSize: 35,
                fontFamily: "ARIAL",
                fontWeight: "bold",
                paddingLeft: 20,
                paddingTop: 50
        },
        container: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
        },
        buttons: {
                margin: 5,
                padding: 20,
                color: "white",
                fontWeight: "bold",
                borderRadius: 10,
                width: "60%",
                alignItems: "center"
        },
        buttonText: {
                color: '#FFF',
                fontWeight: 'bold',
                fontSize: 14,
        }
})
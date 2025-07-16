import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import WorkCard from '../components/WorkCard'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AddWorkModel from '../components/AddWorkModel'
import { WorkContext } from '../context/WorkContext'

const Home = () => {
        const [modelVisible, setModelVisible] = useState(false)
        const { penddingWorks, }: any = useContext(WorkContext)
        penddingWorks.sort((a: string, b: string) => a.date.localeCompare(b.date));


        const handelAddWorkButton = () => {
                setModelVisible(true)
        }

        return (
                <SafeAreaView style={styles.main}>

                        {/* <InputWithDropdown/> */}

                        <View style={styles.header}>
                                <Text style={styles.heading}>Works</Text>
                        </View>
                        <Text style={styles.count}>{penddingWorks.length}</Text>

                        <ScrollView>

                                {
                                        penddingWorks.map((ele: any, index: number) => (
                                                <WorkCard key={index} data={ele} />
                                        ))
                                }
                        </ScrollView>
                        <TouchableOpacity style={styles.fab}
                                onPress={handelAddWorkButton}
                        >
                                <AntDesign name="pluscircle" size={60} color="#4fc5c5" />
                        </TouchableOpacity>


                        <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modelVisible}
                                onRequestClose={() => setModelVisible(false)}
                        >
                                <AddWorkModel setModelVisible={setModelVisible} edit={false} />
                        </Modal>
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
        },
        heading: {
                color: "#FFFF",
                fontSize: 35,
                fontFamily: "ARIAL",
                fontWeight: "bold",
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

        input: {
                backgroundColor: '#f1f1f1',
                padding: 10,
                borderRadius: 8,
                marginBottom: 12,
                width: '90%',
                color: "black"
        },
        modalOverlay: {
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.6)',
                padding: 15,
        },
        modalContent: {
                backgroundColor: '#424646',
                borderRadius: 12,
                padding: 20,
        },
        modalTitle: {
                fontSize: 20,
                marginBottom: 12,
                textAlign: 'center',
                fontWeight: 'bold',
                color: "white"
        },
        modalButtons: {
                flexDirection: 'row',
                justifyContent: 'space-between',
        },
        modalButton: {
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
                marginTop: 10,
        },
        modalButtonText: {
                color: 'white',
                fontWeight: 'bold',
        },
})

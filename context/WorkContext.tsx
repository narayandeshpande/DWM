import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

type workType = {
        id: number;
        name: string;
        date: string;
        time: string;
        address: string;
        completed: boolean;
        canceled: boolean;
};

type noteType={
        id:number,
        heading:string,
        content:string,
        date:string
}

type incomeType = {
        id: number,
        name: string,
        date: string,
        amount: string
}

type expenditureType = {
        id: number,
        reason: string,
        date: string,
        amount: string

}

type WorkContextType = {
        penddingWorks: workType[];
        allWorks: workType[];
        updateAllWorks: (newWorks: workType[]) => Promise<void>;
        completedWorks: workType[],
        canceledWorks: workType[],
        incomes: incomeType[],
        updateIncome: (newIncomes: incomeType[]) => Promise<void>,
        updateExpenditure: (newExpenditures: expenditureType[]) => Promise<void>,
        expenditures: expenditureType[],
        notes:noteType[],
        getAllNotes:()=>Promise<void>
        addNote:(newNote:noteType[])=>Promise<void>
};

export const WorkContext = createContext<WorkContextType>({
        penddingWorks: [],
        allWorks: [],
        updateAllWorks: async () => { },
        completedWorks: [],
        canceledWorks: [],
        incomes: [],
        updateIncome: async () => { },
        updateExpenditure: async () => { },
        expenditures: [],
        notes:[],
        addNote:async()=>{},
        getAllNotes:async()=>{}

});

export const WorkProvider = ({ children }: any) => {
        const [penddingWorks, setPenddingWorks] = useState<workType[]>([]);
        const [allWorks, setAllWorks] = useState<workType[]>([]);
        const [completedWorks, setCompltedWorks] = useState<workType[]>([])
        const [canceledWorks, setCanceledWorks] = useState<workType[]>([])
        const [incomes, setIncomes] = useState<incomeType[]>([])
        const [expenditures, setExpenditures] = useState<expenditureType[]>([])
        const [notes,setNotes]=useState<noteType[]>([])

        // ✅ Load data from AsyncStorage on mount
        useEffect(() => {
                const getData = async () => {
                        // AsyncStorage.clear()
                        try {
                                const allWork = await AsyncStorage.getItem('works');
                                const allIncomes = await AsyncStorage.getItem('incomes')
                                const allexpenditures = await AsyncStorage.getItem('expenditures')

                                if (allWork !== null) {
                                        const parsedAllWork: workType[] = JSON.parse(allWork);
                                        setAllWorks(parsedAllWork);
                                }

                                if (allexpenditures != null) {
                                        const parsedAllexpEnditures: expenditureType[] = JSON.parse(allexpenditures)
                                        setExpenditures(parsedAllexpEnditures)
                                }

                                if (allIncomes != null) {
                                        const parsedAllIncome: incomeType[] = JSON.parse(allIncomes)
                                        setIncomes(parsedAllIncome)
                                }
                        } catch (error) {
                                console.log('Error loading works:', error);
                        }
                };
                getData();
        }, []);

        // ✅ Update penddingWorks whenever allWorks changes
        useEffect(() => {
                const filterPandiingWork = allWorks.filter(
                        (ele) => !ele.completed && !ele.canceled
                );
                setPenddingWorks(filterPandiingWork);

                const filterCompleteWork = allWorks.filter((ele) => ele.completed)
                setCompltedWorks(filterCompleteWork)

                const filtercancelWorks = allWorks.filter((ele) => ele.canceled)
                setCanceledWorks(filtercancelWorks)

        }, [allWorks]);

        // ✅ Function to update allWorks & AsyncStorage
        const updateAllWorks = async (newWorks: workType[]) => {
                
                try {
                        await AsyncStorage.setItem('works', JSON.stringify(newWorks));
                        setAllWorks(newWorks);
                } catch (e) {
                        console.log('Error updating works:', e);
                }
        };

        const updateIncome = async (newIncomes: incomeType[]) => {
                try {
                        await AsyncStorage.setItem('incomes', JSON.stringify(newIncomes))
                        setIncomes(newIncomes)

                } catch (error) {
                        console.log('Error updating incomes:', error);
                }
        }

        const updateExpenditure = async (newExpenditures: expenditureType[]) => {
                try {
                        await AsyncStorage.setItem('expenditures', JSON.stringify(newExpenditures))
                        setExpenditures(newExpenditures)
                } catch (error) {
                        console.log('Error updating expenditure:', error);
                }
        }

        const addNote=async(newNote:noteType[])=>{
           
                try {
                        await AsyncStorage.setItem('notes',JSON.stringify(newNote))
                        setNotes(newNote)
                        
                } catch (error) {
                        console.log("Error in add Note")
                }
        }

        const getAllNotes=async()=>{
                try {
                        const allNotes=await AsyncStorage.getItem('notes')
                        if(allNotes!=null){
                                const parseAllNotes:noteType[]=JSON.parse(allNotes)
                                setNotes(parseAllNotes)
                        }
                } catch (error) {
                        console.log("Error in gitting notes")
                }
        }



        return (
                <WorkContext.Provider value={{ penddingWorks, allWorks, updateAllWorks, completedWorks, canceledWorks, incomes, updateIncome, expenditures, updateExpenditure,notes,addNote,getAllNotes }}>
                        {children}
                </WorkContext.Provider>
        );
};

import { createContext, useState } from "react";

export type DataType = {
    name: string 
    email: string 
    phoneNumber: string 
    billingPeriod: 'monthly' | 'yearly'
    plan: 'Arcade' | 'Advanced' | 'Pro' 
    addOns: {
        'Online service': boolean
        'Larger storage': boolean
        'Customizable profile': boolean
    }
}

const INITIAL_DATA: DataType = {
    name: '',
    email: '',
    phoneNumber: '',
    billingPeriod: 'monthly',
    plan: 'Arcade',
    addOns: {
        'Online service': false,
        'Larger storage': false,
        'Customizable profile': false
    }
};

const FormDataContext = createContext({
    data: INITIAL_DATA,
    updateData: (obj: Partial<DataType>) => { console.log(obj) }
})

const FormDataProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [data, setData] = useState(INITIAL_DATA);

    const updateData = (obj: Partial<DataType>) => {
        setData(prevState => {
            return { ...prevState, ...obj}
        })
    }

    return (
        <FormDataContext.Provider value={{ data, updateData }}>
            {children}
        </FormDataContext.Provider>
    )
}

export { FormDataContext, FormDataProvider }
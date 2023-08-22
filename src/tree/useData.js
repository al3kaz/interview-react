import React, { useContext } from 'react'
import tree from './data.json'
import {useState} from "react";


const TreeDataContext = React.createContext()

export const TreeDataProvider =({ children }) => {
    const [data, setData] = useState(tree.data)

    return (
        <TreeDataContext.Provider value={{ data, setData }}>
            {children}
        </TreeDataContext.Provider>
    )
}

export const useTreeData = () => {
    const { data, setData } = useContext(TreeDataContext)
    return { data, setData }
}

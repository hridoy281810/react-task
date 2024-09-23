// DragDropContext.js
import React, { createContext, useState } from 'react';

export const DragDropContext = createContext();

export const DragDropProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    return (
        <DragDropContext.Provider value={{ items, setItems }}>
            {children}
        </DragDropContext.Provider>
    );
};

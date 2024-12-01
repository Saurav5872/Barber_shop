import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loginUserId, setLoginUserId] = useState(() => {
        // Retrieve loginUserId from localStorage on component mount
        return JSON.parse(localStorage.getItem('loginUserId')) || null;
    });

    useEffect(() => {
            // Update localStorage whenever loginUserId changes
    localStorage.setItem('loginUserId', JSON.stringify(loginUserId));
    }, [loginUserId]);

    return (
        <UserContext.Provider value={{ loginUserId, setLoginUserId }}>
            {children}
        </UserContext.Provider>
    );
};  

export const useUser = () => {
    return useContext(UserContext);
};

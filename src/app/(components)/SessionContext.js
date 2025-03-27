"use client"

import React, { createContext, useState, useEffect } from "react";

const SessionContext = createContext();
    export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    console.log('sessionContext: ', session);
    
     useEffect(() => {
        if(typeof window !== 'undefined')
          {const storedSession = localStorage.getItem('session');
         setSession(storedSession ? JSON.parse(storedSession) : null)}
     },[]);

    const updateSession = (newSession) => {
    localStorage.setItem('session', JSON.stringify(newSession));
        setSession(newSession);
    }

    const logout = () => {
        localStorage.removeItem('session');
        setSession(null);
    }

    const data = {session, updateSession, logout}

    return (
        <SessionContext.Provider value={data}>
            {children}
        </SessionContext.Provider>
    );
}

export default SessionContext;
"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as React from "react";
export default function User({params}) {

  const [result, setResult] = useState(null);
  const [session, setSession] = useState(null);
  const {userId} = React.use(params);
  const router = useRouter();
  const click = (table) => {
    router.push(userId + `/${table}`);
  }
  

  useEffect(() => {
    const sessionLog = localStorage.getItem('session');
    console.log("sessionLog: ", sessionLog);
    
    if (sessionLog) {
      setSession(JSON.parse(sessionLog))}
  }, []);  
 

  useEffect(() => {
      const fetchData = async () => {
      const url = `http://localhost:3002/financial/users/${userId}`
      try {

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + session.token,
          },
        });

        console.log(("response status: " + response.status));
        
        if (!response.ok) {
          throw new Error('Network error: ' + response.statusText)
        }
        //const text = await response.text(); 
        //console.log("text: " + text);
        
        //const data = text ? JSON.parse(text) : {}; 
        //console.log("API RESPONSE: " + JSON.stringify(data, null, 2));
        
        const data = response.json();
        setResult(data);  
        console.log("result user: ", result);
      } catch (error) {
        console.error('Error en la petición de usuario: ', error);
      }
    };

    if (session && userId) {
      fetchData();
    }
  }, [session, userId]);

    return (
    <div>
      <div> {result ? 
        <div className="text-center">
          <h1 style={{margin: '3rem'}}>Hello {session.name}</h1>
          <div className="btn-group-vertical gap-2" style={{width: '18rem'}}>
            <button type="button" className="btn btn-outline-secondary" onClick={() => click('savings')}>Savings</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => click('investments')}>Investments</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => click('incomes')}>Incomes</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => click('expenses')}>Expenses</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => click('credits')}>Credits</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => click('bills')}>Bills</button>
          </div>
        </div> : 
        <div className="text-center">
          <div className="spinner-border"  role="status">
          <span className="visually-hidden"></span>
          </div>
        </div>}
      </div>
    </div>
    )   
}


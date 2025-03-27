"use client"

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "react-bootstrap/Card";

export default function User({params}) {

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);
  const {userId} = React.use(params);

  useEffect(() => {
    const sessionLog = localStorage.getItem('session');
    console.log("sessionLog: ", sessionLog);
    
    if (sessionLog) {
      setSession(JSON.parse(sessionLog))}
  }, []);

  useEffect(() => {
      const fetchData = async () => {
      const url = `http://localhost:3002/financial/${userId}/bills`
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + session.token,
          },
        });

        if (!response.ok) {
            console.log('Network response was not ok');
        }
        const data = await response.json();
        setResult(data);
        
      } catch (error) {
        setError(error.message);
        console.error('Error en la petición de bills: ', error);
      }
    };

    if (userId && session) {
      fetchData();
    }
  
  }, [userId, session]);



    return (
      <div className="cards">
        {result && result.length > 0 ? (
          result.map((item, index) => (    
            <Card key={index} style={{ width: '15rem', backgroundColor: 'transparent', color:'#616a6b'}} border="danger">
              <Card.Header style={{fontWeight: 'bold', textTransform: 'uppercase'}}>{item.description}</Card.Header>
              <Card.Body>
                <div style={{display: 'flex', flexDirection: 'row', gap:'5px'}}>
                <Card.Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>
                  Amount:  
                </Card.Text>  
                <Card.Text>{item.amount}</Card.Text>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', gap:'5px'}}>
                <Card.Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>
                Entity: 
                </Card.Text>  
                <Card.Text>{item.entity}</Card.Text>
                </div>
                </Card.Body>
            </Card>
          ))
        ) : (
            <div className="text-center">
            <h2>No hay facturas disponibles.</h2>
            <button type="button" className="btn btn-outline-danger">Crear Facturas</button>
          </div>
        )}
      {error && <div>{error}</div>}
    </div> 
    )
}
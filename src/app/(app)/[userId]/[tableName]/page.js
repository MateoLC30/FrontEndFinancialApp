"use client"

import { useState, useEffect } from "react";


export default function User({params}) {

  const [result, setResult] = useState();
  const [error, setError] = useState(null);
  const userId = params.userId;
  const tableName = params.tableName;

  useEffect(() => {
      const fetchData = async () => {
      const url = `http://localhost:3002/financial/${userId}/${tableName}`
      try {
        const response = await fetch(url, {
          method: 'GET',
        });
        const data = await response.json();
        setResult(data);  
        console.log('result: ', result);
      } catch (error) {
        setError(error.mesage);
        console.error('Error en la petición de savings: ', error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  
  
    return (
    <div>
     {tableName}
     {error && <div>{error}</div>}
    </div>
    )   
}




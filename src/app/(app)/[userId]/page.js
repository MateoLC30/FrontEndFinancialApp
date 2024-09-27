"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function User({params}) {

  const [result, setResult] = useState();
  const userId = params.userId;
  const router = useRouter();
  const click = (table) => {
    router.push(userId + `/${table}`);
  }


  useEffect(() => {
      const fetchData = async () => {
      const url = `http://localhost:3002/financial/users/${userId}`
      try {
        const response = await fetch(url, {
          method: 'GET',
        });
        const data = await response.json();
        setResult(data);  
      } catch (error) {
        console.error('Error en la petición de usuario: ', error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

    return (
    <div>
      <div> {result ? 
        <div class="text-center">
          <h1 style={{margin: '3rem'}}>Hello {result.name}</h1>
          <div class="btn-group-vertical gap-2" style={{width: '18rem'}}>
            <button type="button" class="btn btn-outline-secondary" onClick={() => click('savings')}>Savings</button>
            <button type="button" class="btn btn-outline-secondary" onClick={() => click('investments')}>Investments</button>
            <button type="button" class="btn btn-outline-secondary" onClick={() => click('incomes')}>Incomes</button>
            <button type="button" class="btn btn-outline-secondary" onClick={() => click('expenses')}>Expenses</button>
            <button type="button" class="btn btn-outline-secondary" onClick={() => click('credits')}>Credits</button>
            <button type="button" class="btn btn-outline-secondary" onClick={() => click('bills')}>Bills</button>
          </div>
        </div> : 
        <div class="text-center">
          <div class="spinner-border"  role="status">
          <span class="visually-hidden"></span>
          </div>
        </div>}
      </div>
    </div>
    )   
}


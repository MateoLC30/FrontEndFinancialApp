"use client"

import * as React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function UpdatePass({params}) {
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  const [totalData, setTotalData] = useState("");
  const [updated, setUpdated] = useState(false);
  const {uuid} = React.use(params);
  const router = useRouter();

  const handleSubmit = async (e) => {
    const url = `http://localhost:3002/financial/users/resetPassword/${uuid}`;
    console.log('passsword: ' + totalData);
    console.log('token extraido de la url: ' + uuid);
    
    
    try {
      const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({password: totalData,
      }),
      headers: {  
        'Content-Type': 'application/json'
      },
    })
    if(!response) {
      setError(response);
    }else {
      setUpdated(true);
      push();
    }
    } catch (error) {
      setError(error.message);
    }
  }

  const push = () => {
    router.push(`/sign_in`);
  }

    const matchPasswords = () => {
      if (data === totalData) {
        handleSubmit();
      } else {
        setError('Passwords do not match');
      }
    }

    console.log("data: " + data,  "totalData: " + totalData);
  

  return (
    <div>
      {updated ? <h2>Password changed success</h2> : 
      <Form className="col-md-3 mx-auto">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" placeholder="Password" style={{marginBottom: '1rem'}} value={data} onChange={(e) => setData(e.target.value)}/>
          <Form.Label>Confirm Your Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={totalData} onChange={(e) => setTotalData(e.target.value)}/>
        </Form.Group>
        <Button  variant="outline-secondary" className="buttonLogin" onClick={matchPasswords}>Update</Button>
        {error && <p style={{ color:'red', fontSize: '0.9rem'}}>{error}</p>}
      </Form>}
    </div>
    )}
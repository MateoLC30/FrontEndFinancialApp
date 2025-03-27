"use client"

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../../global.css";
import SessionContext from "../../(components)/SessionContext.js";
export default function SignIn () {
    const router = useRouter();
    const { updateSession } = useContext(SessionContext);
    const url = "http://localhost:3002/financial/login";

    const [data, setData] = useState({
        "email": "",
        "password": "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        console.log('Data: ', data);
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const res = await response.json()
                throw new Error(`${res.error}`);
            }
            
            const result = await response.json();
           
            updateSession(result); 
            
            console.log('Response data: ', result);
            console.log("Resultado completo: ", JSON.stringify(result));
            console.log("token: " + result.token, "id: " + result.userId);   

          
            if (result && result.userId) {
                router.push(
                 `/${result.userId}`
                )

            } else {
                setError('Error del result: ', result.message || 'Login failed');
            }
        } catch (error) {
            setError("error: " + (error.message || 'An unexpected error occurred'));
        } finally {
            setLoading(false);
        }
    };

    return (
    <Form className="col-md-3 mx-auto" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
        </Form.Group>

        {error && <p className="text-danger">{error}</p>}

        <div className="bottom">
            <Button  variant="outline-secondary" type="submit" disabled={loading} className="buttonLogin">

            {loading ? 'Logging in...' : 'Login'}
            </Button>
            <Link href="../password" className="link">¿Forgot your Password?</Link>
        </div>
    </Form>
);
}

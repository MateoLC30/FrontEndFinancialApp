"use client"

import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from "next/navigation";

    export default function signUp () {

        const router = useRouter();

        const url = "http://localhost:3002/financial/newUser";

        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const [success, setSuccess] = useState(false);

        const [data, setData] = useState({
            "name": "",
            "email": "",
            "password": null
        });
            
        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError(null);
            setSuccess(false);
    
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.text();
                console.log(result);
                
            
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } 
                
                if (result) {
                    setSuccess(true);
                  //window.location.href = "/" + result.user.id -- otra froma de realizarlo
                } else {
                    setError(result.message || 'Create failed');
                }
            } catch (error) {
                setError(error.message || 'An unexpected error occurred');
            } finally {
                setLoading(false);
            }};

        return (
                <Form className="col-md-3 mx-auto" onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Your Name" value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
                    </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
                    </Form.Group>

                    {success && <p className="text-success">User Created Successfully</p>}  
                    {error && <p className="text-danger">{error}</p>}

                    <Button variant="outline-secondary" type="submit" disabled={success || loading}>
                    GO!
                    </Button>
                </Form>
            
    )}

"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../../global.css";

export default function signIn () {

    const router = useRouter();
    const url = "http://localhost:3002/financial/login";

    const [data, setData] = useState({
        "email": "",
        "password": "",
    })

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            
            const result = await response.json();
            
            if (result) {
                router.push(
                 `/${result.user.id}`
                )
              //window.location.href = "/" + result.user.id -- otra froma de realizarlo

            } else {
                setError(result.message || 'Login failed');
            }
        } catch (error) {
            setError(error.message || 'An unexpected error occurred');
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

        <div>
            <Button variant="outline-secondary" type="submit" disabled={loading}>

            {loading ? 'Logging in...' : 'Login'}
            </Button>
            <Link href="../password">Forgot Password</Link>
        </div>
    </Form>
)}

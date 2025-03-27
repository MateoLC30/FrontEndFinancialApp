"use client"

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
export default function ForgotPassword() {
    const [sendEmail, setSendEmail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({ email: "" });
    const [error, setError] = useState("");
    const [emailCheck, setEmailCheck] = useState("");
    
    console.log("data: " + data.email);
    
    const handleSubmit = async () => {       
        
        const url = 'http://localhost:3002/financial/password';

        try {
            const response = await fetch (url, {
                method: 'POST',
                body: JSON.stringify({email: data.email}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const result = await response.json();
            console.log('result: ', result);
            
            if (!response.ok) {
                throw new Error(result.error || 'Error al verificar el correo.');
            } else {
                setSendEmail(true);
                setError(""); 
            }
            console.log("result:" + result);

        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        };

        if (!data.email.trim()) {
            setError("Por favor, introduce un correo electrónico.");
            setSendEmail(false);
        } else {
            setEmailCheck("Correo electrónico enviado correctamente");
            setIsLoading(true);
        }
    }

    return (
    <Form className="col-md-3 mx-auto">
        <h2>Recuperar contraseña</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setData({...data, email: e.target.value})} disabled={sendEmail}/>
        </Form.Group>
        {error ? <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p> : sendEmail ? <p style={{ color: 'green', fontSize: '0.9rem'}}>{emailCheck}</p> : null}
        <Button  variant="outline-secondary" className="buttonLogin"  onClick={handleSubmit} disabled={isLoading || sendEmail}>Enviar</Button>
    </Form>
)}
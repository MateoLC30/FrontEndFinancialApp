"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import * as React from "react";


export default function User({ params }) {
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);
  const [open, setOpen] = useState(null);
  const [editing, setEditing] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [newSaving, setNewSaving] = useState(false);
  const {userId} = React.use(params);
  //const savingId = params.savingId;
  const [formData, setFormData] = useState({
  amount: '',
  entity: '',
  date: '',
  annualInterest: '',
  description: '',
  });

  
  useEffect(() => {
    const sessionLog = localStorage.getItem("session");
    console.log("sessionLog: ", sessionLog);
    console.log('Session: ', session);
    
    if (sessionLog) {
      setSession(JSON.parse(sessionLog));
    }
  }, []);

  const fetchData = async () => {
    const url = `http://localhost:3002/financial/${userId}/savings`;
    if (!session || !session.token) {
      console.error("Session or token is missing.");
      return;
    }
    
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session.token,
        },
      });

      if (!response.ok) {
        console.log("Network response was not ok");
      }
      const data = await response.json();
      setResult(data);
      console.log('Result de data: ', result);
      
    } catch (error) {
      setError(error.message);
      console.error("Error en la petición de savings: ", error);
    }      
  };

  useEffect(() => {
    
    if (userId && session) {
      fetchData();
    }
  }, [userId, session]);

  const Click = (id) => {
    setOpen(open === id ? null : id);
  };

  console.log('Open: ' + open);

 // const savingId = result.map(item => item.id)

  const handleEdit = (item) => {
    // if (!item) {
    //   console.error("Item is undefined");
    //   return;
    // }
    setEditing(item.id);
    setOpen(item.id);
    setSavingId(item.id);
    
    setFormData({
      amount: item.amount,
      entity: item.entity,
      date: item.date,
      annualInterest: item.annualInterest,
      description: item.description
    });
  };

  console.log('formData: ','amount: ', formData.amount,'entity: ', formData.entity,'date: ', formData.date,'annualinterest: ', formData.annualInterest);
  console.log('userId: ', userId, 'savingId: ', savingId);
 

  const handleSave = async () => {
    const url = `http://localhost:3002/financial/${userId}/savings/${savingId}/update`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.token,
        },
        body: JSON.stringify(formData),
      })

       if (response.ok) {
        setEditing(null);
        fetchData();
         //setOpen(null);
      }
    } catch (error) {
      setError("error: " + (error.message || 'An unexpected error occurred'));
    }
  }

  const handleDelete = async (id) => {
    
    const url = `http://localhost:3002/financial/user/${userId}/savings/${id}/delete`;
    try {
      const response = await fetch(url,{
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + session.token
        }
      })
      if (response.ok) {
        setEditing(null);
        fetchData();
        console.log('se ha ejecutado el delete');
        
      }
    } catch (error) {
      setError("error: " + (error.message || 'An unexpected error occurred'));
    }
  }
  console.log('handleEdit: ', editing, '  ', 'handleSave: ', editing, '  ', 'Open: ', open);

  const handleNewSaving = async () => {
    const url = `http://localhost:3002/financial/${userId}/savings/newSaving`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.token,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setNewSaving(false);
        fetchData();
      }
    } catch (error) {
      setError("error: " + (error.message || 'An unexpected error occurred'));
    }
  }
  
  const createSaving = () => {
     setNewSaving(true);
  };

  return  (
  
  <div className="cards">
  {newSaving === true ? 
    <form>
      <div className="form-group row" style={{fontWeight: "bold", textTransform: "uppercase"}}>
        <label className="col-sm-4 col-form-label">Description</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}/>
        </div>
      </div>
      <div className="form-group row" style={{fontWeight: "bold", textTransform: "uppercase"}}>
        <label className="col-sm-4 col-form-label">Amount</label>
        <div className="col-sm-8">
          <input type="number" className="form-control" placeholder="Amount" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})}/>
        </div>
      </div>
      <div className="form-group row" style={{fontWeight: "bold", textTransform: "uppercase"}}>
        <label className="col-sm-4 col-form-label">Entity</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" placeholder="Entity" value={formData.entity} onChange={(e) => setFormData({...formData, entity: e.target.value})}/>
        </div>
      </div>
      <div className="form-group row" style={{fontWeight: "bold", textTransform: "uppercase"}}>
        <label className="col-sm-4 col-form-label">Date</label>
        <div className="col-sm-8">
          <input type="date" className="form-control" placeholder="Date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})}/>
        </div>
      </div>
      <div className="form-group row" style={{fontWeight: "bold", textTransform: "uppercase"}}>
        <label className="col-sm-4 col-form-label">Interest</label>
        <div className="col-sm-8">
          <input type="number" className="form-control" placeholder="Interest" value={formData.interest} onChange={(e) => setFormData({...formData, annualInterest: e.target.value})}/>
        </div>
      </div>
      <button type="button" className="btn btn-outline-success" style={{marginTop: '2rem'}} onClick={handleNewSaving}>Save</button>
    </form>
  : <div className="cards">
    {result && result.length > 0 ? (
    
    result.map((item) => (
      
      <Card key={item.id} style={{cursor: 'pointer', width: "30rem", height: "auto", backgroundColor: "transparent", color: "#616a6b"}} border="success"
     >
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Card.Header style={{ fontWeight: "bold", textTransform: "uppercase", width: '70%'}} onClick={() => Click(item.id)} 
            aria-controls="example-collapse-text"
            aria-expanded={open === item.id}>{item.description}
          </Card.Header>
        
          <button type="button" className="btn btn-outline-danger" style={{width: "20%"}} onClick={() => handleDelete(item.id)}>Borrar</button>
        </div>

        <Collapse in={open === item.id}>
          <Card.Body>
            {editing === item.id ? (
              <div>
                
                <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                  <Card.Text style={{ fontWeight: "bold", textTransform: "uppercase", width:'20%'}}>Amount:</Card.Text>
                  <input type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} style={{backgroundColor: 'transparent', color: 'grey'}}/>
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                  <Card.Text style={{ fontWeight: "bold", textTransform: "uppercase", width:'20%'}}>Entity:</Card.Text>
                  <input type="text" value={formData.entity} onChange={(e) => setFormData({...formData, entity: e.target.value})} style={{backgroundColor: 'transparent', color: 'grey'}}/>
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                  <Card.Text style={{ fontWeight: "bold", textTransform: "uppercase", width:'20%'}}>Date:</Card.Text>
                  <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} style={{backgroundColor: 'grey ligth', color: 'grey'}}/>
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                  <Card.Text style={{ fontWeight: "bold", textTransform: "uppercase", width:'20%' }}>Interest:</Card.Text>
                  <input type="number" value={formData.annualInterest} onChange={(e) => setFormData({...formData, annualInterest: e.target.value})} style={{backgroundColor: 'transparent', color: 'grey'}}/>
                </div>
          
                <button type="button" className="btn btn-outline-success" onClick={handleSave}>Save</button>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                  <Card.Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>Amount:</Card.Text>
                  <Card.Text>{item.amount}</Card.Text>
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                  <Card.Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>Entity:</Card.Text>
                  <Card.Text>{item.entity}</Card.Text>
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                  <Card.Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>Date:</Card.Text>
                  <Card.Text>{new Date().toLocaleDateString('es-MX')}</Card.Text>
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                  <Card.Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>Interest:</Card.Text>
                  <Card.Text>{item.annualInterest}%</Card.Text>
                </div>
                
                <button type="button" className="btn btn-outline-primary" onClick={() => handleEdit(item)}>Editar</button>
              </div>
            )}
          </Card.Body>
        </Collapse>
      </Card>
      
    ))
    ) : (
    <div className="text-center">
      <h2>No hay ahorros disponibles.</h2>
      <button type="button" className="btn btn-outline-success">Crear Ahorro</button>
    </div>
    )}
    {error && <div>{error}</div>}
    <div className="text-center">
      <button type="button" className="btn btn-outline-success" onClick = {() => createSaving()} >Nuevo Ahorro</button>
    </div>
    </div>}
  </div>
  
  );
  }

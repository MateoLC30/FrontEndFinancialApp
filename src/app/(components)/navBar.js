"use client"

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import "../global.css";
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import SessionContext from './SessionContext.js'


export default function NavBar () {
    const { session, logout } = useContext(SessionContext)
    const router = useRouter()

    const handleLogout = () => {
        logout();
        router.push('/')
    }

    const initialPage = () => {
        router.push('/')
    }

    // const SignIn = () => {
    //     localStorage.setItem('session')
    // }

    return (
        <nav className="header">
            <h1 onClick={initialPage} style={{cursor: 'pointer'}}>Financial Project</h1>
            <div className="buttonRow">
                {!session ? (
                    <>
                        <Button href="./sign_in" variant="outline-secondary">Sign In</Button>
                        <Button href="./sign_up" variant="outline-secondary">Sign Up</Button>
                    </>
                ) : (
                    <Button variant="outline-secondary" onClick={handleLogout}>Logout</Button>
                )}
            </div>
        </nav>
    );
}


//if (session) {
  //  <nav className="header">
    //    <h1>Financial Project</h1>
      //  <div className="buttonRow">
        //    <Button href="./sign_in" variant="outline-secondary">Sign In</Button>
         //   <Button href="./sign_up" variant="outline-secondary">Sign Up</Button>
        //</div>  
    //</nav>  
    //} else (
      //  <nav className="header">
        //    <h1>Financial Project</h1>
          //  <div className="buttonRow">
            //    <Button href="./logout" variant="outline-secondary">Logout</Button>
            //</div>
        //</nav>

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import  NavBar  from "./(components)/navBar";
import { SessionProvider } from "./(components)/SessionContext";

export default function MainLayout({children}) {
  return (
    <SessionProvider>
    <html>
    
    <body>
    <NavBar />

    <main >{children}</main>
    </body>
    
    </html>
    </SessionProvider>
  )
}
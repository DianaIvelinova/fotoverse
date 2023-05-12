import { Container, Button, Form } from "react-bootstrap"
import Footer from "../components/Footer"
import Link from "next/link"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/initFirebase"
import { useRouter } from 'next/router';
import { useUser } from "@fotoverse/hooks/useUser"

export default function index() {
  const [email,setEmail] = useState(" ");
  const [pass,setPass] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useUser();

  const logIn = (event) => {
    console.log(event)
    event.preventDefault();
    signInWithEmailAndPassword(auth,email,pass)
      .then(() => {
        setTimeout(() => {
          router.push(`/${user?.uid}`);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setError("The email or password is not correct")
      })
  }

  return (
    <div>
      <form onSubmit={logIn}>
        <Container className="d-flex justify-content-center align-items-center">
          <img alt="" className="pe-2" src="./laptop.jpg"></img>
          <div className="d-flex flex-column align-items-center w-25 border h-100">
            <img className='logoLogin p-1 mt-4 mb-4 d-flex' alt='' src='./logo.svg'/>
            <div className="w-75">
              <Form.Control className="mb-1"  maxLength={75} autoCapitalize="off" type="email" 
                placeholder="Email or Phone number" value={email} onChange={(event) => setEmail(event.target.value)}/>
              <Form.Control className="mb-3"  maxLength={75} autoCapitalize="off" type="password" 
                placeholder="Password" value={pass} onChange={(event) => setPass(event.target.value)}/>
                {error && <div className="alert alert-danger">{error}</div>}
              <Button type="submit" className="w-100" variant="primary">Log in</Button>
            </div>
              <div className="mt-3" style={{color: "gray"}}> OR </div>
              <div className="mt-3 mb-4">Don't have an account? <Link href="./signUp">Sign up</Link></div>
          </div>
        </Container>
      </form>
      <Footer/>
    </div>
  )
}

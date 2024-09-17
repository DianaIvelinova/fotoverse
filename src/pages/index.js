import { Container, Button, Form } from "react-bootstrap"
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
      <img alt="" className="pe-2 background-image" src="./universe.jfif"></img>
        <Container className="login-container">
          <div className="login-form">
          <div className="m-2 gradient-text"><h1>fotoverse</h1></div>            <div className="w-75">
              <Form.Control className="mb-1"  maxLength={75} autoCapitalize="off" type="email" 
                placeholder="Email or Phone number" value={email} onChange={(event) => setEmail(event.target.value)}/>
              <Form.Control className="mb-3"  maxLength={75} autoCapitalize="off" type="password" 
                placeholder="Password" value={pass} onChange={(event) => setPass(event.target.value)}/>
                {error && <div className="alert alert-danger">{error}</div>}
              <Button type="submit" className="w-100" variant="secondary">Log in</Button>
            </div>
              <div className="mt-3" style={{color: "dark gray"}}> OR </div>
              <div className="mt-3 mb-4">Don't have an account? <Link style={{color: "#fff"}} href="./signUp">Sign up</Link></div></div>
        </Container>
      </form>
    </div>
  )
}

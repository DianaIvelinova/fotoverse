import { Container, Button, Form } from "react-bootstrap"
import Link from "next/link"
import { createUserWithEmailAndPassword,updateProfile,getIdToken } from "firebase/auth"
import { useState } from "react"
import { auth } from "../firebase/initFirebase"
import { useRouter } from "next/router"

export default function signUp() {
    const [email,setEmail] = useState(" ");
    const [pass,setPass] = useState("");
    const [username,setUsername] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const signUp = (event) => {
      event.preventDefault();
      createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, { displayName: username })
            .then(() => {
              getIdToken(auth.currentUser)
                .then((idToken) => {
                  console.log("User token:", idToken);
                  router.push(`/${user.uid}`);
                })
                .catch((error) => {
                  console.error("Error generating user token.", error);
                });
            })
            .catch((error) => {
              console.error("Error updating user profile.", error);
            });
        })
        .catch((error) => {
          console.log(error);
          setError("Password must be at least 6 symbols!");
        });
    };

    return (
        <div>
            <form onSubmit={signUp}>
                <Container className="d-flex justify-content-center align-items-center vh-100">
                    <div className="d-flex flex-column justify-content-center align-items-center w-25 border">
                      <div className="m-2 gradient-text"><h1>fotoverse</h1></div>
                      <div className="signUpText">Sign up to see photos from your friends.</div>
                      <div className="w-75">
                        <Form.Control className="mb-1" type="email" placeholder="Email"
                          value={email} onChange={(event) => { setEmail(event.target.value)}}/>
                        <Form.Control className="mb-1" type="text" placeholder="Username" 
                          value={username} onChange={(event) => { setUsername(event.target.value)}}/>
                        <Form.Control className="mb-3" type="password" placeholder="Password" 
                          value={pass} onChange={(event) => { setPass(event.target.value)}}/>
                          {error && <div className="alert alert-danger">{error}</div>}
                          <Button type="submit" className="w-100" variant="primary">Sign up</Button>
                        </div>
                        <div className="mt-3" style={{color: "gray"}}> OR </div>
                        <div className="mt-3 mb-4">Already have an account? <Link href="./">Log in</Link></div>
                    </div>
                </Container>
            </form>
        </div>
    )
}
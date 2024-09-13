import { Button,Container } from "react-bootstrap"
import { auth } from "../firebase/initFirebase"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth";

export default function UserSection() {
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        const showName = onAuthStateChanged(auth, (user) => {
          if (user) {
            setDisplayName(user.displayName);
          } else {
            setDisplayName("");
          }
        });
    
        return showName;
      }, [auth]);

    return (
        <Container>
            <div className="d-flex mt-4 ms-5 justify-content-evenly">
                <div className="mt-3 ms-3 d-flex flex-column justify-content-end">
                    <div className="d-flex">
                        <h2>{displayName}</h2>
                        <Button className="ms-2 h-100 rounded-pill" variant="secondary">Edit profile</Button>
                    </div>
                    <div>Posts</div>
                    <div>This is this profile's description</div>
                </div>
                <button className="profile">
                    <img alt='' src="./260185.png" className="w-100"/>
                </button>
            </div>
            <div className="border m-3"></div>
        </Container>
    )
}
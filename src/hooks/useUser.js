import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, getIdToken, signOut } from "firebase/auth";
import { auth } from "@fotoverse/firebase/initFirebase";

export function userSignOut() {
  signOut(auth)
    .then(() => {
      console.log("sign out successful");
    })
    .catch((error) => console.log(error));
};

const useUser = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const detachEventListener = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        getIdToken(currentUser)
          .then((idToken) => {
            setToken(idToken);
          })
          .catch((error) => {
            console.error("Error retrieving user token:", error);
          });
      } else {
        setUser(null);
        setToken(null);
      }
    });

    return () => {
        detachEventListener();
    };
  }, []);

  return { user, token };
};

export { useUser };

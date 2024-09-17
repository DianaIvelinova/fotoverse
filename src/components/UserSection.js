import { Button,Container,Modal } from "react-bootstrap"
import { auth } from "../firebase/initFirebase"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth";
import useModal from '@fotoverse/hooks/useModal';
import usePhoto from '@fotoverse/hooks/usePhoto';

export default function UserSection() {
    const [displayName, setDisplayName] = useState("");
    const { modal, setModalContent } = useModal();
    const { selectedImgRef, uploadImg, handleImgChange } = usePhoto();

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

      
  function handleAlbumInfoModal() {
    let content = (
      <>
        <div>
          <input
            type="file"
            className="ms-3"
            ref={selectedImgRef}
            onChange={handleImgChange}
          />
        </div>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={uploadImg}>
            Upload
          </Button>
        </Modal.Footer>
      </>
    );
    setModalContent(content);
  }

    return (
        <Container>
            <div className="d-flex mt-4 ms-5 justify-content-evenly">
                <div className="mt-3 ms-3 d-flex flex-column justify-content-end">
                    <div className="d-flex">
                        <h2>{displayName}</h2>
                        <Button className="ms-2 h-100 rounded-pill" variant="secondary">Edit</Button>
                        <Button className="ms-2 h-100" variant="dark" onClick={handleAlbumInfoModal}> Upload </Button>
                    </div>
                    <div>Posts</div>
                    <div>This is the description</div>
                </div>
                <button className="profile">
                    <img alt='' src="./260185.png" className="w-100"/>
                </button>
            </div>
            <div className="border m-3"></div>
            {modal()}
        </Container>
    )
}
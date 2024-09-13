import { Navbar,Nav,Button,Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from 'next/router';
import useModal from '@fotoverse/hooks/useModal';
import usePhoto from '@fotoverse/hooks/usePhoto';
import { useUser, userSignOut } from '@fotoverse/hooks/useUser';
import Image from 'next/image';

export default function Header() {
  const { modal, setModalContent } = useModal();
  const { selectedImgRef, uploadImg, handleImgChange } = usePhoto();
  const { user } = useUser();
  const router = useRouter();

  console.log(user?.uid, "user id");

  const logout = () => {
    userSignOut();
    router.push("/");
  };

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
    <div >
    <header>
        <div className="heart-container">
            <div className="logo">
                <h1>MyBrand</h1>
            </div>
            <nav className="nav-links">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </nav>
        </div>
    </header>
      {modal()}
    </div>
  );
}

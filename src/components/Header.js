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
    <div className='d-flex align-items-center justify-content-center mt-4'>
      <header className="custom-header">
        <div className="d-flex flex-row justify-content-start align-items-center">
          <Nav>
            <Nav.Link className='p-0' href={`${user?.uid}`}>
              <Image alt="" width={30} height={30} src="./icon.svg" />
            </Nav.Link>
          </Nav>
          <Navbar.Brand href="/profile">
            <Image alt="" width={100} height={40} className="logo ms-2" src="./logo.svg" />
          </Navbar.Brand>
        </div>
        <div className="mt-4 d-flex align-items-center gap-4">
          <Nav className="mb-4 m-2 nav-btn">
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav>
          <Nav className="mb-4 m-2 nav-btn">
            <Image alt="" width={25} height={25} className="headerIcon search" src="./create.svg"
            />
            <Nav.Link className='p-0' onClick={handleAlbumInfoModal}>Upload</Nav.Link>
          </Nav>
          <Nav className="mb-4">
            <Image alt="" width={25} height={25} className="headerIcon" src="./logout.svg" />
            <Nav.Link className='' onClick={logout}></Nav.Link>
          </Nav>
        </div>
    </header>
      {modal()}
    </div>
  );
}

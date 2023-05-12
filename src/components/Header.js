import { Navbar,Nav,Button,Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from 'next/router';
import useModal from '@fotoverse/hooks/useModal';
import usePhoto from '@fotoverse/hooks/usePhoto';
import { useUser, userSignOut } from '@fotoverse/hooks/useUser';

export default function Header() {
  const { modal,setModalContent } = useModal();
  const { selectedImgRef, uploadImg, handleImgChange } = usePhoto();
  const { user } = useUser();
  const router = useRouter(); 

  console.log(user?.uid,"user id")
 
  const logout = () => {
    userSignOut();
    router.push("/")
  }

  function handleAlbumInfoModal() {
    let content = (
      <>
        <div> 
          <input type="file" className="ms-3" ref={selectedImgRef} onChange={handleImgChange} /> 
        </div>
        <Modal.Footer className='border-0'>
          <Button variant="secondary" onClick={uploadImg}>Upload</Button>
        </Modal.Footer>
      </>
    );
    setModalContent(content);
  }

  return (
    <div>
      <div className='d-flex flex-column header border'>
          <Navbar.Brand href="/"><img className='logo' alt='' src='./logo.svg'/></Navbar.Brand>
          <div className='mt-4'>
            <Nav className='mb-4'><img className='headerIcon me-1' alt='' src='./home.svg'/><Nav.Link href="/home">Home</Nav.Link></Nav>
            <Nav className='mb-4'><img className='headerIcon search' alt='' src='./search.svg'/><Nav.Link href="#search">Search</Nav.Link></Nav>
            <Nav className='mb-4'><img className='headerIcon search' alt='' src='./create.svg'/><Nav.Link onClick={handleAlbumInfoModal}>Upload</Nav.Link></Nav>
            <Nav className='mb-4'><img className='headerIcon ms-1' alt='' src='./icon.svg'/><Nav.Link href={`${user?.uid}`}>Profile</Nav.Link></Nav>
            <Nav className='mb-4'><img className='headerIcon ms-1' alt='' src='./logout.svg'/><Nav.Link onClick={logout}>Logout</Nav.Link></Nav>
          </div>
      </div>
      {modal()}
    </div>
  );
}

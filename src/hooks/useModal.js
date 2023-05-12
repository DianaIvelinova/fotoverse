import React,{useState} from 'react';
import { Button,Modal } from 'react-bootstrap';

export default function useModal() {  
  const [modalContent, setModalContent] = useState();

  function close() { setModalContent(null); }

  function modal() {
    if (modalContent == null || modalContent == undefined) { return <></> };
    
    return (
      <>
        <Modal show={true} onHide={() => close()}>
          <Modal.Header closeButton>
            <Modal.Title>Upload Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalContent}</Modal.Body>
        </Modal>
      </>
    );
  };

  return {modal,setModalContent}
  }

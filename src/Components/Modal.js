import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form';

import axios from "axios";
const Modal1 = ({show , onHide}) => {


  const [inputs, setInputs] = useState({  
    roomKey: '',
    roompw: '', 
   
  })

  const [roomKey,setrroomKey] = useState("");
  const [roompw,setroompw] = useState("");
 

  const onChange1 = (event) =>{
    setrroomKey(event.target.value)
  }
  const onChange2 = (event) =>{
    setroompw(event.target.value)
  }



  const handleSubmit = () => {
   try {
    axios.post("http://Udangtangtangapp-env.eba-xaipu9ej.ap-northeast-2.elasticbeanstalk.com/", {roomKey: roomKey, roomPw: roompw })
   } catch (error) {
    console.error(error)
   } 
  }
  return (
    <Modal
    show = {show}
    onHide = {onHide}
     
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
      방 입장하기
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>
     

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>키를 입려(key)</Form.Label>
        <Form.Control type="text" placeholder="방이름 입력하세요" onChange = {onChange1}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="비밀번호를 입력 하세요" onChange = {onChange2} />
      </Form.Group>
      
      
      
    </Form>
    </Modal.Body>

    <Modal.Footer>
     
        <Button onClick={handleSubmit} variant="primary" type="submit">
            Submit
          </Button>
          <Button onClick={onHide}>Close</Button>
     
    </Modal.Footer>
    
  </Modal>
 
  )
}

export default Modal1
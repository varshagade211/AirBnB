import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginFormPage from './LoginFormPage';
import './index.css'


function LoginFormModal({className,btnTxt}) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      {/* <button className='loginButton' onClick={() => setShowModal(true)}>Log In</button> */}
      <button type='button' className={className} onClick={() => setShowModal(true)}>{btnTxt}</button>

      {showModal && (
        <Modal className={"loginModalContent"} onClose={() => setShowModal(false)}>
          <LoginFormPage />

        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;

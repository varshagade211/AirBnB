import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginFormPage from './LoginFormPage';
import './index.css'


function LoginFormModal({className}) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      {/* <button className='loginButton' onClick={() => setShowModal(true)}>Log In</button> */}
      <button className={className} onClick={() => setShowModal(true)}>Log In</button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginFormPage />

        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;

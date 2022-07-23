import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginFormPage from './LoginFormPage';
import './index.css'
// import {useShowModel} from '../../context/showModelContext'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  //  const {setShowModal,showModal} =  useShowModel()

  return (
    <>
      <button className='loginButton' onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginFormPage />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;

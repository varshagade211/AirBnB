import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './SignupFormPage';
import './index.css'

function SignupFormModal({className,btnTxt}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button type='button' className={className} onClick={() => setShowModal(true)}>{btnTxt}</button>
      {showModal && (
        <Modal className={"signUpModal"} onClose={() => setShowModal(false)}>
          <SignupFormPage />
          <hr className='line'></hr>
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;

import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReviewForm from './CreateReview.js';
// import './index.css'


function CreateReviewFormModal({className}) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      {/* <button className='loginButton' onClick={() => setShowModal(true)}>Log In</button> */}
      <button className={className} onClick={() => setShowModal(true)}>Add Review</button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReviewForm setShowModalClose={setShowModal}/>

        </Modal>
      )}
    </>
  );
}

export default CreateReviewFormModal;

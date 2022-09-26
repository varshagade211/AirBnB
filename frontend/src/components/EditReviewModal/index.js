import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditReviewForm from './EditReview.js';
// import './index.css'


function CreateReviewFormModal({className,review}) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      {/* <button className='loginButton' onClick={() => setShowModal(true)}>Log In</button> */}
      <button className={className} onClick={() => setShowModal(true)}>Edit Review</button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm setShowModalClose={setShowModal} review={review}/>

        </Modal>
      )}
    </>
  );
}

export default CreateReviewFormModal;

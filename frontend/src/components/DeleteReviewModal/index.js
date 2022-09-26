import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteReviewForm from './DeleteReviewForm.js';
// import './index.css'


function DeleteReviewFormModal({className,reviewId}) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      {/* <button className='loginButton' onClick={() => setShowModal(true)}>Log In</button> */}
      <button className={className} onClick={() => setShowModal(true)}>Delete Review</button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteReviewForm setShowModalClose={setShowModal} reviewId={reviewId}/>

        </Modal>
      )}
    </>
  );
}

export default DeleteReviewFormModal;

import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteBookingForm from './DeleteBookingForm.js';
// import './index.css'


function DeleteSpotFormModal({className,booking}) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      {/* <button className='loginButton' onClick={() => setShowModal(true)}>Log In</button> */}
      {/* <button className={className} onClick={() => setShowModal(true)}>Delete Review</button> */}
      <button  className={className} onClick={() => setShowModal(true)}>Delete Listing</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteBookingForm setShowModalClose={setShowModal} booking={booking}/>

        </Modal>
      )}
    </>
  );
}

export default DeleteSpotFormModal;

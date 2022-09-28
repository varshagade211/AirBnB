import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteBookingForm from './DeleteBookingForm.js';
import './index.css'


function DeleteSpotFormModal({className,booking}) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      {/* <button className='loginButton' onClick={() => setShowModal(true)}>Log In</button> */}
      {/* <button className={className} onClick={() => setShowModal(true)}>Delete Review</button> */}
      <p  className={className} onClick={() => setShowModal(true)}><i className="fa-solid fa-xmark " style={{marginRight:1+'rem'}}></i> Cancel Booking</p>

      {showModal && (
        <Modal className={'deleteBookingModalContent'} onClose={() => setShowModal(false)}>
          <DeleteBookingForm setShowModalClose={setShowModal} booking={booking}/>

        </Modal>
      )}
    </>
  );
}

export default DeleteSpotFormModal;

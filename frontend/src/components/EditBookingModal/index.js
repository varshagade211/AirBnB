import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditBookingForm from './EditBookingForm.js';
// import './index.css'


function EditBookingModal({className,booking}) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      {/* <button className='loginButton' onClick={() => setShowModal(true)}>Log In</button> */}
      <button className={className} onClick={() => setShowModal(true)}>Edit Booking</button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditBookingForm setShowModalClose={setShowModal} booking={booking}/>

        </Modal>
      )}
    </>
  );
}

export default EditBookingModal;

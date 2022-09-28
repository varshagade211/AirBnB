import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditBookingForm from './EditBookingForm.js';
import './index.css'


function EditBookingModal({className,booking}) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      {/* <button className='loginButton' onClick={() => setShowModal(true)}>Log In</button> */}
      <p className={className} onClick={() => setShowModal(true)}><i className="fa-solid fa-pen" style={{marginRight:1+'rem'}}></i>Edit Booking</p>

      {showModal && (
        <Modal className={ 'editBookingModalContent'} onClose={() => setShowModal(false)}>
          <EditBookingForm setShowModalClose={setShowModal} booking={booking}/>

        </Modal>
      )}
    </>
  );
}

export default EditBookingModal;

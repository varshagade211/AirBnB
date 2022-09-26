import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteSpotForm from './DeleteSpotForm.js';
// import './index.css'


function DeleteSpotFormModal({className,singleSpot}) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      {/* <button className='loginButton' onClick={() => setShowModal(true)}>Log In</button> */}
      {/* <button className={className} onClick={() => setShowModal(true)}>Delete Review</button> */}
      <button  className={className} onClick={() => setShowModal(true)}>Delete Listing</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteSpotForm setShowModalClose={setShowModal} singleSpot={singleSpot}/>

        </Modal>
      )}
    </>
  );
}

export default DeleteSpotFormModal;

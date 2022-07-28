import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
 import AddImages from './AddImages';
import './index.css'


function AddImagesFormModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
        <div className='editsingleImageContainer '>
         <div  className='addMoreImages' onClick={() => setShowModal(true)}>
          <div className='homeLogoAndAddHomebtnContainer '>
          <i className="fa-solid fa-house houseLogo"></i>
          <p className='addMoreImagestxt'>Add more Images</p></div>
          </div>

         </div>


      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddImages setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default AddImagesFormModal;

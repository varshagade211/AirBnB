import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeletePopUp from './DeletePopUp.js';
import './index.css'


function DeletePopUpModal({ImageId, image, setRefresh}) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <div className='editsingleImageContainer' onClick={()=>setShowModal(true)}>
        <img className='editImages'src={image} alt='name'/>
        <div className='dotIconContainer'> <i className="fa fa-ellipsis-h dotsIcon " aria-hidden="true"></i></div>
      </div>
      {showModal && (
        <Modal  onClose={() => setShowModal(false)}>
        <DeletePopUp ImageId={ImageId} setRefresh={setRefresh}  setShowModal={ setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default DeletePopUpModal;

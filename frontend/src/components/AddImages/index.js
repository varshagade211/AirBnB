import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
 import AddImages from './AddImages';
// import './index.css'


function AddImagesFormModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>

      <button  onClick={() => setShowModal(true)}>Add more Images</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddImages setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default AddImagesFormModal;

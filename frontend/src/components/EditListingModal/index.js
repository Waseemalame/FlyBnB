import './EditListingModal.css'
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditListingForm from '../EditListingForm';

function EditListingModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditListingForm />
        </Modal>
      )}
    </>
  );
}

export default EditListingModal;

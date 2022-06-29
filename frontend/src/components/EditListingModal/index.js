import './EditListingModal.css'
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditListingForm from '../EditListingForm';

function EditListingModal({ listing }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditListingForm listing={listing} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditListingModal;

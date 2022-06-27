import './EditListingModal.css'
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditListingForm from '../EditListingForm';
import './EditListingModal.css'
function EditListingModal({ listing }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <div className="edit-form-modal">
          <Modal onClose={() => setShowModal(false)}>
            <EditListingForm listing={listing} />
          </Modal>
        </div>
      )}
    </>
  );
}

export default EditListingModal;

import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from "../../context/Modal"
import SignUpForm from "./SignUpForm";
import "./SignUp.css"
function SignUpFormModal( ) {
  // const dispatch = useDispatch();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const user = useSelector(state => state.session.user);

  return (
    <>

          <button className="signup-btn" onClick={() => setShowSignupModal(true)}>
            Create Account
          </button>

      {showSignupModal && (
        <Modal onClose={() => setShowSignupModal(false)}>
          <SignUpForm setShowSignupModal={setShowSignupModal} />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;

import React from 'react';
import { useModal } from './ModalContext';

import "../../styles/app/modal.scss";

const Modal: React.FC = () => {
  const { modalContent, isModalVisible, hideModal } = useModal();

  // if (!isModalVisible || !modalContent) return null;

  return (
    <div className={`modal-overlay ${!isModalVisible ? 'hidden' : ''}`} onClick={hideModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {isModalVisible && modalContent ? modalContent(hideModal) : ''}
        {/* <div className='modal-border'></div>
        <div className='modal-panel'>
          
        </div>
        <button className="close-button" onClick={hideModal}>
          <img src={closeIcon} alt='close' />
        </button>         */}
      </div>
    </div>
  );
};

export default Modal;

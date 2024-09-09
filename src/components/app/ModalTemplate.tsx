import { ReactNode } from 'react';
import { useModal } from './ModalContext';

import "../../styles/app/modal.scss";

interface ModalTemplateProps {
    children: ReactNode;
    isOpened: boolean;
    onClose: () => void;
    styles?: React.CSSProperties;
}

export default function ModalTemplate({ children, isOpened, styles, onClose }: ModalTemplateProps) {
  const { modalContent, isModalVisible } = useModal();

  // if (!isModalVisible || !modalContent) return null;

  return (
    <div className={`modal-overlay ${!isOpened ? 'hidden' : ''}`}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={styles}>
        {isModalVisible && modalContent ? modalContent(onClose) : ''}
        {/* <div className='modal-border'></div>
        <div className='modal-panel'>
          
        </div>
        <button className="close-button" onClick={hideModal}>
          <img src={closeIcon} alt='close' />
        </button>         */}
            {children}
      </div>
    </div>
  );
};


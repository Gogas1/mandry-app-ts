import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ModalContextProps {
  showModal: (content: (hideModal: () => void) => ReactNode) => void;
  hideModal: () => void;
  modalContent: ((hideModal: () => void) => ReactNode) | null;
  isModalVisible: boolean;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalContent, setModalContent] = useState<((hideModal: () => void) => ReactNode) | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = (content: (hideModal: () => void) => ReactNode) => {
    setModalContent(() => content);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalContent(null);
    setModalVisible(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal, modalContent, isModalVisible }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

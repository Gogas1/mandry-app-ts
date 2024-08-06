import { Modal } from '@mui/material';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import ModalTemplate from './ModalTemplate';

interface ModalContextProps {
  showModal: (content: (hideModal: () => void) => ReactNode) => void;
  hideModal: () => void;
  modalContent: ((hideModal: () => void) => ReactNode) | null;
  isModalVisible: boolean;

  openModal: (id: string, component: ReactNode) => void;
  closeModal: (id: string) => void;
  isOpen: (id: string) => boolean;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeModal, setActiveModal] = useState('');
  const [modals, setModals] = useState<Map<string, ReactNode>>(new Map());
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

  const openModal = (id: string, component: ReactNode) => {
    if(!modals.has(id)) {
      setModals(prev => new Map(prev).set(id, component));
    }
    
    setActiveModal(id);
  };

  const closeModal = (id: string) => {
    setModals(prev => {
      const newModals = new Map(prev);
      newModals.delete(id);
      return newModals;
    });
  };

  const isOpen = (id: string) => id === activeModal;

  return (
    <ModalContext.Provider value={{ showModal, hideModal, modalContent, openModal, closeModal, isOpen, isModalVisible }}>
      {children}
      {Array.from(modals.entries()).map(([id, component]) => (
        <ModalTemplate key={id} onClose={() => closeModal(id)} isOpened={isOpen(id)}>
          {component}
        </ModalTemplate>
      ))}
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

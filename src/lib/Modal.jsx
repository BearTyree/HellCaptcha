import * as Dialog from '@radix-ui/react-dialog';
import { createContext, useContext, useState } from 'react';

// Create a context to manage modal state globally
const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalProps, setModalProps] = useState({});

  const openModal = (content, title = '', props = {}) => {
    setModalContent(content);
    setModalTitle(title);
    setModalProps(props);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // Clear content after animation completes
    setTimeout(() => {
      setModalContent(null);
      setModalTitle('');
      setModalProps({});
    }, 300);
  };

  // Add a function to update the modal title dynamically
  const updateModalTitle = (newTitle) => {
    setModalTitle(newTitle);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, updateModalTitle }}>
      {children}
      
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 z-50 backdrop-blur-sm" />
          <Dialog.Content 
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-[400px] max-w-[95vw] max-h-[90vh] z-50 overflow-auto"
            {...modalProps.contentProps}
            onPointerDownOutside={(e) => e.preventDefault()}
          >
            {modalTitle && (
              <div className="border-b border-gray-200 p-4 flex justify-between items-center">
                <Dialog.Title className="text-gray-700 font-medium">
                  {modalTitle}
                </Dialog.Title>
                <Dialog.Close className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Dialog.Close>
              </div>
            )}
            
            <div className={`${!modalTitle ? 'pt-8' : ''} p-4`}>
              {modalContent}
            </div>
            
            {modalProps.showFooter && (
              <div className="border-t border-gray-200 p-4 flex justify-end items-center gap-2">
                {modalProps.footerContent || (
                  <Dialog.Close 
                    className="bg-[#4a90e2] text-white px-4 py-2 rounded hover:bg-[#3b7dd8]"
                  >
                    {modalProps.closeButtonText || 'Close'}
                  </Dialog.Close>
                )}
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ModalContext.Provider>
  );
};

// Custom hook to use the modal
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}; 
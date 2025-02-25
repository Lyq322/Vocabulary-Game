import { Button, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react';

const InstructionsButtonModal = ({ language, color, zhInstructions, enInstructions }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button 
        size='sm'
        bg={`${color}.100`}
        borderColor={`${color}.500`}
        borderWidth='1px'
        color={`${color}.500`}
        onClick={onOpen}
      >
        {language === 'en' ? 'INSTRUCTIONS' : '说明'}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pb={0}>{language === 'en' ? 'Instructions' : '说明'}</ModalHeader>
          <ModalBody pb={4}>
            {language === 'en' ? enInstructions : zhInstructions}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InstructionsButtonModal;
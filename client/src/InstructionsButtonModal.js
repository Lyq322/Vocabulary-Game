import { Button, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';

const InstructionsButtonModal = ({ color, instructions }) => {
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
        INSTRUCTIONS
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pb={0}>Instructions</ModalHeader>
          <ModalBody pb={4}>
            {instructions}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InstructionsButtonModal;
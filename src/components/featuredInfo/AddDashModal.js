import React, { useRef } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import AddDash from "./AddDash";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0rem;
  right: 0rem;
  display: flex;
  justify-content: safe center;
  align-content: safe center;
  z-index: 999;
`;

const ModalWrapper = styled.div`
  max-height: calc(100vh - 15rem);
  overflow-y: auto;
  width: 45rem;
  height: 150rem;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: fixed;
  top: 10rem;
  z-index: 10;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  /* display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-content: center;
  justify-content: center; */
  @media only screen and (max-width: 600px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    max-width: 30rem;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const AddDashModal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };
  return (
    <>
      {showModal ? (
        <Background ref={modalRef} onClick={closeModal}>
          <ModalWrapper showModal={showModal}>
            <AddDash />
            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setShowModal((prev) => !prev)}
            />
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

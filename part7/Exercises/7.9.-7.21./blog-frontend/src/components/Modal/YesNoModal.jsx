import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const YesNoModal = ({ showModal, toggleModal, handleYes, modalMessage }) => {
  return (
    <Modal show={showModal} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalMessage}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleYes}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

YesNoModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  handleYes: PropTypes.func.isRequired,
  modalMessage: PropTypes.string.isRequired,
};
export default YesNoModal;

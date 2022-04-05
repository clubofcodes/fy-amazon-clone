import React, { useState } from "react";
import { Button, Container, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  addCategory,
  updateCategory,
} from "../../../Redux/Products/ProductActions";

const AddCategory = ({ Btn, edit = false, cat = { name: "", id: null } }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const [category, setCategory] = useState(cat.name);
  const handleClose = () => {setShow(false);setCategory('')}

  const dispatch = useDispatch();

  const addCategoryHandler = (e) => {
    e.preventDefault();
    if (edit) {
      dispatch(updateCategory(cat.id, category));
    } else {
      dispatch(addCategory(category));
    }
    handleClose();
  };

  return (
    <>
      <span onClick={handleShow}>{Btn}</span>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={(e) => addCategoryHandler(e)}>
          <Modal.Header closeButton>
            <Modal.Title>{edit ? "Edit Category" : "Add Category"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <FloatingLabel label="Category" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddCategory;

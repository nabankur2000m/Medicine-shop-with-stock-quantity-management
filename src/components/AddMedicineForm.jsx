/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

function AddMedicineForm({ onAdd }) {
  const [medicine, setMedicine] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(medicine);
    setMedicine({ name: "", description: "", price: "", quantity: "" });
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formMedicineName">
              <Form.Label>Medicine Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter medicine name"
                name="name"
                value={medicine.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formMedicineDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={medicine.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formMedicinePrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={medicine.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formMedicineQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                name="quantity"
                value={medicine.quantity}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </Container>
  );
}

export default AddMedicineForm;

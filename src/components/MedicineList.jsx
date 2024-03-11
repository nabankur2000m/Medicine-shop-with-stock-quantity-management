/* eslint-disable react/prop-types */
import { Button, Card, Container, Row, Col } from "react-bootstrap";

function MedicineList({ medicines, onAddToCart }) {
  return (
    <Container className="mt-5">
      <Row xs={1} md={2} lg={3} className="g-4">
        {medicines.map((medicine, index) => (
          <Col key={index}>
            <Card>
              <Card.Body>
                <Card.Title>{medicine.name}</Card.Title>
                <Card.Text>{medicine.description}</Card.Text>
                <Card.Text>Rs.{medicine.price}</Card.Text>
                <Card.Text>Quantity Available: {medicine.quantity}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => onAddToCart(index)}
                  disabled={medicine.quantity <= 0}
                >
                  {medicine.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MedicineList;

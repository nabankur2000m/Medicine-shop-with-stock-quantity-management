import { Container, Navbar, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import AddMedicineForm from "./components/AddMedicineForm";
import MedicineList from "./components/MedicineList";
import Cart from "./components/Cart";

function App() {
  const [medicines, setMedicines] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    const loadedMedicines = localStorage.getItem("medicines");
    const loadedCartItems = localStorage.getItem("cartItems");
    if (loadedMedicines) {
      setMedicines(JSON.parse(loadedMedicines));
    }
    if (loadedCartItems) {
      setCartItems(JSON.parse(loadedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("medicines", JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddMedicine = (medicine) => {
    setMedicines([
      ...medicines,
      { ...medicine, quantity: parseInt(medicine.quantity) },
    ]);
  };

  const handleAddToCart = (index) => {
    const newMedicines = [...medicines];
    const item = newMedicines[index];
    item.quantity -= 1;

    const cartIndex = cartItems.findIndex(
      (cartItem) => cartItem.name === item.name
    );
    if (cartIndex > -1) {
      const newCartItems = [...cartItems];
      newCartItems[cartIndex].cartQuantity += 1;
      setCartItems(newCartItems);
    } else {
      setCartItems([...cartItems, { ...item, cartQuantity: 1 }]);
    }

    setMedicines(newMedicines);
  };

  const onRemoveFromCart = (index) => {
    const item = cartItems[index];

    if (item.cartQuantity < 2) {
      const updatedCart = cartItems.filter(
        (cartItem) => cartItem.name !== item.name
      );

      setCartItems(updatedCart);
    } else {
      const updateCart = cartItems.map((cartItem) =>
        cartItem.name === item.name
          ? { ...cartItem, cartQuantity: --cartItem.cartQuantity }
          : cartItem
      );
      setCartItems(updateCart);
    }

    const updatedMedicines = medicines.map((medicine) =>
      medicine.name === item.name
        ? { ...medicine, quantity: ++medicine.quantity }
        : medicine
    );

    setMedicines(updatedMedicines);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="justify-content-between">
        <Container>
          <Navbar.Brand href="#home">Medicine Shop Admin</Navbar.Brand>
          <Button
            variant="outline-success"
            onClick={() => setIsCartVisible(true)}
          >
            View Cart
          </Button>
        </Container>
      </Navbar>

      <AddMedicineForm onAdd={handleAddMedicine} />
      <MedicineList medicines={medicines} onAddToCart={handleAddToCart} />
      {isCartVisible && (
        <Cart
          items={cartItems}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={onRemoveFromCart}
          onClose={() => setIsCartVisible(false)}
        />
      )}
    </>
  );
}

export default App;

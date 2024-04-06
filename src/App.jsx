import { Container, Navbar, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import AddMedicineForm from "./components/AddMedicineForm";
import MedicineList from "./components/MedicineList";
import Cart from "./components/Cart";

const MEDICINES_ENDPOINT = "https://crudcrud.com/api/8aa19cd555cd4c41adfc3230da8b6c50/medicines";
const CART_ITEMS_ENDPOINT = "Yhttps://crudcrud.com/api/8aa19cd555cd4c41adfc3230da8b6c50/cartItems";

function App() {
  const [medicines, setMedicines] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);


  useEffect(() => {
    axios.get(MEDICINES_ENDPOINT)
      .then((response) => setMedicines(response.data))
      .catch((error) => console.error("Failed to fetch medicines: ", error));

    axios.get(CART_ITEMS_ENDPOINT)
      .then((response) => setCartItems(response.data))
      .catch((error) => console.error("Failed to fetch cart items: ", error));
  }, []);

  const handleAddMedicine = (medicine) => {
    axios.post(MEDICINES_ENDPOINT, medicine)
      .then((response) => {
        setMedicines([...medicines, response.data]);
      })
      .catch((error) => console.error("Failed to add medicine: ", error));
  };

  const handleAddToCart = (medicineId) => {
    const medicine = medicines.find(med => med._id === medicineId);
    if (medicine && medicine.quantity > 0) {
      const updatedMedicines = medicines.map(med =>
        med._id === medicineId ? { ...med, quantity: med.quantity - 1 } : med
      );
      setMedicines(updatedMedicines);
      axios.put(`${MEDICINES_ENDPOINT}/${medicineId}`, { ...medicine, quantity: medicine.quantity - 1 });

      const existingCartItemIndex = cartItems.findIndex(item => item.name === medicine.name);
      if (existingCartItemIndex > -1) {
        const updatedCartItems = cartItems.map((item, index) =>
          index === existingCartItemIndex ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
        );
        setCartItems(updatedCartItems);
        axios.put(`${CART_ITEMS_ENDPOINT}/${updatedCartItems[existingCartItemIndex]._id}`, updatedCartItems[existingCartItemIndex]);
      } else {
        const newItem = { ...medicine, cartQuantity: 1 };
        axios.post(CART_ITEMS_ENDPOINT, newItem).then((response) => {
          setCartItems([...cartItems, response.data]);
        });
      }
    } else {
      alert("This medicine is out of stock.");
    }
  };

  const onRemoveFromCart = (cartItemId) => {
    const cartItem = cartItems.find(item => item._id === cartItemId);
    if (!cartItem) return;

    if (cartItem.cartQuantity > 1) {
      const updatedCartItems = cartItems.map(item =>
        item._id === cartItemId ? { ...item, cartQuantity: item.cartQuantity - 1 } : item
      );
      setCartItems(updatedCartItems);
      axios.put(`${CART_ITEMS_ENDPOINT}/${cartItemId}`, { ...cartItem, cartQuantity: cartItem.cartQuantity - 1 });
    } else {
      const updatedCartItems = cartItems.filter(item => item._id !== cartItemId);
      setCartItems(updatedCartItems);
      axios.delete(`${CART_ITEMS_ENDPOINT}/${cartItemId}`);
    }

    const medicineIndex = medicines.findIndex(med => med.name === cartItem.name);
    if (medicineIndex > -1) {
      const updatedMedicines = medicines.map((med, index) =>
        index === medicineIndex ? { ...med, quantity: med.quantity + 1 } : med
      );
      setMedicines(updatedMedicines);
      axios.put(`${MEDICINES_ENDPOINT}/${medicines[medicineIndex]._id}`, updatedMedicines[medicineIndex]);
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="justify-content-between">
        <Container>
          <Navbar.Brand href="#home">Medicine Shop Admin</Navbar.Brand>
          <Button variant="outline-success" onClick={() => setIsCartVisible(true)}>
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

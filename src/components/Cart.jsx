/* eslint-disable react/prop-types */
function Cart({ items, onClose, onAddToCart, onRemoveFromCart }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0",
        backgroundColor: "#00000078",
      }}
      // onClick={onClose}
    >
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          zIndex: 100,
          width: "300px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          onClick={onClose}
          style={{
            marginBottom: "20px",
            alignSelf: "flex-end",
          }}
        >
          Close
        </button>
        {items.length === 0 ? (
          <h2>Your Cart is Empty</h2>
        ) : (
          <>
            <h2>Your Cart</h2>
            {items.map((item, index) => (
              <div
                key={index}
                style={{ textAlign: "center", marginBottom: "15px" }}
              >
                <h4>{item.name}</h4>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <button onClick={() => onRemoveFromCart(index)}>-</button>
                  <p style={{ margin: "0 10px" }}>
                    Quantity: {item.cartQuantity}
                  </p>
                  <button onClick={() => onAddToCart(index)}>+</button>
                </div>
                <p>Price: Rs.{item.price}</p>
                <p>Total: Rs.{item.price * item.cartQuantity}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart, setCart }) => {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [vendingMachineId, setVendingMachineId] = useState("");

  // Calculate the total price by summing up the prices of all products in the cart
  const totalPrice = cart.reduce((acc, product) => acc + Number(product.price), 0);

  // Function to handle removing an item from the cart
  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  // Function to handle checkout button click
  const handleCheckout = () => {
    setShowCheckoutForm(true);
  };

  // Function to handle form submission (Vending Machine ID form)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Vending Machine ID: ${vendingMachineId}`);
    setShowCheckoutForm(false);
    setShowPaymentForm(true);
    setVendingMachineId(""); // Reset vending machine ID
  };

  // Function to handle payment method button click
  const handlePaymentMethod = (method) => {
    alert(`Payment through ${method} is selected.`);
  };

  return (
    <>
      <div className="container my-5" style={{ width: "54%" }}>
        {
          cart.length === 0 ? (
            <div className='text-center'>
              <h1>Your Cart is Empty</h1>
              <Link to={"/"} className='btn btn-warning'>Continue Shopping...</Link>
            </div>
          ) : (
            cart.map((product, index) => {
              return (
                <div key={index} className="card mb-3 my-5" style={{ width: '700px' }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={product.imgSrc} className="img-fluid rounded-start" alt={product.title} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body text-center">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.description}</p>
                        <button className="btn btn-primary mx-3">
                          Rs {product.price} 
                        </button>
                        <button onClick={() => handleRemoveItem(product.id)} className="btn btn-danger mx-3">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )
        }
      </div>

      {/* Display the total price and checkout/clear options if there are items in the cart */}
      {
        cart.length !== 0 && (
          <div className="container text-center my-5" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <div className="total-price">
              <h3>Total Price: Rs {totalPrice} </h3>
            </div>
            <button onClick={handleCheckout} className='btn btn-warning mx-5'>Checkout</button>
            <button onClick={() => setCart([])} className='btn btn-danger'>Clear Cart</button>
          </div>
        )
      }

      {/* Checkout Form Modal */}
      {showCheckoutForm && (
        <div className="checkout-form-modal" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'opacity 0.3s ease-in-out'
        }}>
          <div className="checkout-form" style={{
            backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '400px', textAlign: 'center',
            opacity: showCheckoutForm ? 1 : 0
          }}>
            <h2>Enter Vending Machine ID</h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                value={vendingMachineId}
                onChange={(e) => setVendingMachineId(e.target.value)}
                placeholder="Vending Machine ID"
                required
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
              />
              <button type="submit" className="btn btn-primary">Proceed to Payment</button>
              <button onClick={() => setShowCheckoutForm(false)} className="btn btn-secondary" style={{ marginLeft: '10px' }}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <div className="payment-form-modal" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'opacity 0.3s ease-in-out'
        }}>
          <div className="payment-form" style={{
            backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '400px', textAlign: 'center',
            opacity: showPaymentForm ? 1 : 0
          }}>
            <h2>
              <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/razorpay-icon.png" 
                alt="Razorpay" style={{ width: '100px', marginBottom: '10px' }} />
            </h2>
            <div className="payment-buttons">
              <button onClick={() => handlePaymentMethod('Net Banking')} className="btn btn-primary mb-3" style={{ width: '100%' }}>Payment through Net Banking</button>
              <button onClick={() => handlePaymentMethod('Credit/Debit Cards')} className="btn btn-primary mb-3" style={{ width: '100%' }}>Payment through Credit/Debit Cards</button>
              <button onClick={() => handlePaymentMethod('UPI')} className="btn btn-primary mb-3" style={{ width: '100%' }}>Payment through UPI</button>
            </div>
            <button onClick={() => setShowPaymentForm(false)} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;

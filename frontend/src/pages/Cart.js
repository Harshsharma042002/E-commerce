import React, { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
    const { cart, removeFromCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(null);
    const paymentFormRef = useRef(null);
    
    const totalAmount = cart.reduce((acc, product) => acc + product.price, 0) * 100; 
    useEffect(() => {
        paymentFormRef.current = new window.SqPaymentForm({
            applicationId: 'sandbox-sq0idb-pn8En_or4-kGX7ig8qxiTA', 
            inputClass: 'sq-input',
            autoBuild: false, 
            cardNumber: {
                elementId: 'sq-card-number',
                placeholder: 'Card Number',
            },
            cvv: {
                elementId: 'sq-cvv',
                placeholder: 'CVV',
            },
            expirationDate: {
                elementId: 'sq-expiration-date',
                placeholder: 'MM/YY',
            },
            postalCode: {
                elementId: 'sq-postal-code',
                placeholder: 'Postal Code',
            },
            callbacks: {
                cardNonceResponseReceived: (errors, nonce) => {
                    if (errors) {
                        console.error('Errors occurred:', errors);
                        setPaymentSuccess(false);
                        return;
                    }
                    processPayment(nonce);
                },
            },
        });

        paymentFormRef.current.build();
    }, []);

    const processPayment = async (nonce) => {
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/process-payment', {
                nonce: nonce, 
                amount: totalAmount, 
            });
            setPaymentSuccess(true);
            alert('Payment successful!');
        } catch (error) {
            console.error('Payment failed:', error);
            setPaymentSuccess(false);
            alert('Payment failed, please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = (event) => {
        event.preventDefault();
        paymentFormRef.current.requestCardNonce(); 
    };

    return (
        <div>
            <h1 className="text-3xl flex font-bold justify-center text-green-600">SHOPPING CART</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cart.map((product, index) => (
                    <div key={index} className="border border-gray-300 rounded p-4 mt-5 flex justify-between items-center">
                        <div className="flex items-center">
                            <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded" />
                            <div className="ml-4">
                                <h2 className="font-bold text-lg">{product.name}</h2>
                                <p className="text-black text-xl font-medium">Price: ₹{product.price}</p>
                            </div>
                        </div>
                        <IconButton onClick={() => removeFromCart(product.id)} color="secondary">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                ))
            )}
            {cart.length > 0 && (
                <div className="mt-4">
                    <h2 className="font-bold text-xl m-4">Total Amount: ₹{(totalAmount / 100).toFixed(2)}</h2>

                    <form id="payment-form" onSubmit={handlePayment}>
                        <div id="sq-card-number"></div>
                        <div id="sq-expiration-date"></div>
                        <div id="sq-cvv"></div>
                        <div id="sq-postal-code"></div>

                        <button 
                            className="flex justify-center items-center m-3 w-24 bg-blue-500 text-white p-2 rounded"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Order Now'}
                        </button>
                    </form>

                    {paymentSuccess === true && <p className="text-green-500">Payment Successful!</p>}
                    {paymentSuccess === false && <p className="text-red-500">Payment Failed!</p>}
                </div>
            )}
        </div>
    );
};

export default Cart;

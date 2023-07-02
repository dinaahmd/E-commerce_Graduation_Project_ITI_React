import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/UseAuth';
import '../CSS/cart.css'

const CartPage = () => {
    const { authTokens, setAuthTokens } = useAuth()
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);

    const getCartItems = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/cart/cart/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setCartItems(data);
            } else if (response.status === 401) {
                // Obtain a new access token using the refresh token
                const refreshResponse = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        refresh: authTokens.refresh,
                    }),
                });
                const refreshData = await refreshResponse.json();
                if (refreshResponse.ok) {
                    // Update the auth tokens and retry the request
                    setAuthTokens(refreshData);
                    const retryResponse = await fetch('http://127.0.0.1:8000/cart/cart/', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${refreshData.access}`,
                        },
                    });
                    const retryData = await retryResponse.json();
                    if (retryResponse.ok) {
                        setCartItems(retryData);
                    } else {
                        throw new Error(`${retryResponse.status} ${retryResponse.statusText}`);
                    }
                } else {
                    throw new Error(`${refreshResponse.status} ${refreshResponse.statusText}`);
                }
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.log(error);
            setError('An error occurred while fetching your cart data.');
        }
    };

    const updateCartItem = async (itemId, quantity) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/cart/item/${itemId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authTokens.access}`,
                },
                body: JSON.stringify({
                    quantity,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setCartItems((prevItems) =>
                    prevItems.map((item) => (item.id === itemId ? { ...item, quantity } : item))
                );
            } else if (response.status === 401) {
                // Obtain a new access token using the refresh token
                const refreshResponse = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        refresh: authTokens.refresh,
                    }),
                });
                const refreshData = await refreshResponse.json();
                if (refreshResponse.ok) {
                    // Update the auth tokens and retry the request
                    setAuthTokens(refreshData);
                    const retryResponse = await fetch(`http://127.0.0.1:8000/cart/item/${itemId}/`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${refreshData.access}`,
                        },
                        body: JSON.stringify({
                            quantity,
                        }),
                    });
                    const retryData = await retryResponse.json();
                    if (retryResponse.ok) {
                        setCartItems((prevItems) =>
                            prevItems.map((item) => (item.id === itemId ? { ...item, quantity } : item))
                        );
                    } else {
                        throw new Error(`${retryResponse.status} ${retryResponse.statusText}`);
                    }
                } else {
                    throw new Error(`${refreshResponse.status} ${refreshResponse.statusText}`);
                }
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.log(error);
            setError('An error occurred while updating your cart item.');
        }
    };
    const removeCartItem = async (itemId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/cart/item/${itemId}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });
            if (response.ok) {
                // Remove the item from the frontend
                setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
            } else if (response.status === 401) {
                // Obtain a new access token using the refresh token
                const refreshResponse = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        refresh: authTokens.refresh,
                    }),
                });
                const refreshData = await refreshResponse.json();
                if (refreshResponse.ok) {
                    // Update the auth tokens and retry the request
                    setAuthTokens(refreshData);
                    const retryResponse = await fetch(`http://127.0.0.1:8000/cart/item/${itemId}/`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${refreshData.access}`,
                        },
                    });
                    if (retryResponse.ok) {
                        // Remove the item from the frontend
                        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
                    } else {
                        throw new Error(`${retryResponse.status} ${retryResponse.statusText}`);
                    }
                } else {
                    throw new Error(`${refreshResponse.status} ${refreshResponse.statusText}`);
                }
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.log(error);
            setError(`An error occurred while removing the cart item with ID ${itemId}.`);
        }
    };

    useEffect(() => {
        if (authTokens && authTokens.access) {
            getCartItems();
        }
    }, [authTokens]);

    const handleQuantityIncrease = async (itemId) => {
        const itemToUpdate = cartItems.find((item) => item.id === itemId);
        const newQuantity = itemToUpdate.quantity + 1;
        await updateCartItem(itemId, newQuantity);
    };
    const handleQuantityDecrease = async (itemId) => {
        const itemToUpdate = cartItems.find((item) => item.id === itemId);
        const newQuantity = itemToUpdate.quantity - 1;
        if (newQuantity === 0) {
            await removeCartItem(itemId);
        } else {
            await updateCartItem(itemId, newQuantity);
        }
    };
    return (
        <div className='cart-body'>        
            <div className='container'>
                <h1 className='cart-heading'>My Cart</h1>
                {cartItems.length === 0 ? (
                    <p className='cart-empty'>your cart is empty.</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='table-head'>Product Name</th>
                                <th className='table-head'>Image</th>
                                <th className='table-head'>Quantity</th>
                                <th className='table-head'>Price</th>
                                <th className='table-head'>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td className='pname'>{item.product.name}</td>
                                    <td><img
                                        src={`http://localhost:8000${item.product.image}`}
                                        className="card-img-top"
                                        style={{ height: "150px", objectFit: "contain" ,marginRight:"-290px"}}
                                    /></td>
                                    <td>
                                    <button className='btn cartquantity' onClick={() => handleQuantityDecrease(item.id)}>-</button>
                                    <span className='quantity'> {item.quantity}{' '} </span>  
                                    <button className='btn cartquantity' onClick={() => handleQuantityIncrease(item.id)}>+</button>
                                    </td>
                                    <td className='price'>${item.product.price.toFixed(2)}</td>
                                    <td className='price'>${(item.quantity * item.product.price).toFixed(2)}</td>
                                    <td><button className='btn' onClick={() => removeCartItem(item.id)}><i className="trash bi bi-trash3-fill"></i></button></td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className='pname' colSpan={4}>Total:</td>
                                <td className='price'>
                                    ${cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0).toFixed(2)}
                                </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                    
                )}
                {error && <p>{error}</p>}
            </div>
    </div>
    );
};

export default CartPage;


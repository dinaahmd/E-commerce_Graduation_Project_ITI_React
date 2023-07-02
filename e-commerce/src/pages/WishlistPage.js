import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/UseAuth';

const WishlistPage = () => {
    const { authTokens } = useAuth();
    const [wishlistItems, setWishlistItems] = useState([]);
    const getWishlistItems = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/wishList/wishlist/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setWishlistItems(data);
            } else if (response.status === 401) {
                // Handle unauthorized access
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (authTokens && authTokens.access) {
            getWishlistItems();
        }
    }, [authTokens]);

    const handleRemoveWishlist = async (itemId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/wishList/wishlist/remove/${itemId}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });
            if (response.ok) {
                setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
            } else if (response.status === 401) {
                // Handle unauthorized access
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>My WishList</h1>
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlistItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.product.name}</td>
                                <td>{item.product.description}</td>
                                <td>
                                    <button onClick={() => handleRemoveWishlist(item.id)}>Remove from wishlist</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
export default WishlistPage;
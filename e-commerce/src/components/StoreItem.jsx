import axios from "axios";
import { useAuth } from './UseAuth';
import React from 'react';

const StoreItem = ({ id }) => {
    const { authTokens, setAuthTokens } = useAuth()
    const [item, setItem] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchItem = async () => {
            const response = await axios.get(`http://localhost:8000/products/${id}/`);
            setItem(response.data);
            setLoading(false);
        };

        fetchItem();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/cart/add_to_cart/",
                { product_id: id, quantity: 1 },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authTokens.access}`,
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.log("Error adding item to cart:", error);
        }
    };

    const handleAddToWishlist = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/wishList/wishlist/add/",
                { product_id: id },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authTokens.access}`,
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.log("Error adding item to wishlist:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const { image, name, description, price } = item;

    return (
        <div className="">
            <div className="card" style={{ width: '18rem' }}>
                <img
                    src={`http://localhost:8000${image}`}
                    className="card-img-top"
                    alt={description}
                    style={{ height: "480px", objectFit: "contain" }}
                />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <span>{price} EGP</span>
                    <a href="#" onClick={handleAddToCart} className="btn btn-primary">Add to Cart</a>
                    <a href="#" onClick={handleAddToWishlist} className="btn btn-secondary">Add to Wishlist</a>
                </div>
            </div>
        </div>
    );
};

export default StoreItem;
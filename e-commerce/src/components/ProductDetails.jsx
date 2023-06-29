import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useParams } from "react-router-dom";

const ProductDetails = () => {
    let { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItem = async () => {
        const response = await axios.get(`http://localhost:8000/products/${id}/`);
        setProduct(response.data);
        setLoading(false);
        };

        fetchItem();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const { name, description, price, image } = product;

    return (
        <div className='container'>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{price}</p>
            <img src={`http://localhost:8000${image}`} alt={description} />
        </div>
    );
};

export default ProductDetails;



import React, { useState, useEffect } from "react";
// import { Col, Row } from "react-bootstrap";
import StoreItem from "./StoreItem";
import axios from "axios";

const Store = () => {
    const [storeItems, setStoreItems] = useState([]);

    useEffect(() => {
        const fetchStoreItems = async () => {
            const response = await axios.get("http://localhost:8000/products/");
            setStoreItems(response.data);
        };

        fetchStoreItems();
    }, []);


    return (
        <div>
            <h1 className="p-4 mt-3 text-center store-title">New Collection</h1>
            <div>
            {storeItems.map((output) => (
            <div key={output.id}>
                <StoreItem
                id={output.id}
                productName={output.name}
                productDescription={output.description}
                productPrice={output.price}
                productSale={output.promotion}
                image={output.image}
                />
            </div>
            ))}
            </div>
        </div>
    );
};

export default Store;
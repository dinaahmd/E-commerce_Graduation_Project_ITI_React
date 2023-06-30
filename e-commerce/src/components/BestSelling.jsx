import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const BestSelling = () => {
    const [bestSellingItem, setBestSellingItem] = useState([]);

    React.useEffect(() => {
        const fetchBestSelling = async () => {
            const response = await axios.get("http://127.0.0.1:8000/order/bestSelling/");
            setBestSellingItem(response.data);
            console.log(response)
        };
        fetchBestSelling()
    },[]);

    return (
        <div className="">
            {bestSellingItem.map((item) => {
                return(
                    <div key={item.id} className="card" style={{ width: '18rem' }}>
                        <img
                            src={`http://localhost:8000${item.image}`}
                            className="card-img-top"
                            alt={item.description}
                            style={{ height: "480px", objectFit: "contain" }}
                        />
                        <div className="card-body">
                            <NavLink variant="dark" to={`/products/${item.id}`}><i className='fs-4 text-dark mx-1 bi bi-eye-fill'></i></NavLink>
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.description}</p>
                            <span>{item.price} EGP</span>
                        </div>
                    </div>
                )
            })}
        </div>

    );
};

export default BestSelling;
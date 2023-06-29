import axios from "axios";
import React from "react";
// import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";


const StoreItem = ({ id }) => {
    const [item, setItem] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    // const navigate = useNavigate();

    React.useEffect(() => {
        const fetchItem = async () => {
        const response = await axios.get(`http://localhost:8000/products/${id}/`);
        setItem(response.data);
        setLoading(false);
        };

        fetchItem();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const { image, name, description, price} = item;


return (
    <div className="">
        <div className="card" style={{width: '18rem'}}>
            <img
                src={`http://localhost:8000${image}`}
                className="card-img-top"
                alt={description}
                style={{ height: "480px", objectFit: "contain" }}
            />
            <div className="card-body">
                <NavLink variant="dark" to={`/products/${id}`}><i className='fs-4 text-dark mx-1 bi bi-eye-fill'></i></NavLink>
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <span>{price} EGP</span>
                <a href="#" className="btn btn-primary">Add to Cart</a>
            </div>
        </div>
    </div>
        
    );
};

export default StoreItem;
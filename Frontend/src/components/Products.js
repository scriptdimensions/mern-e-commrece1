import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom'
import { deleteProduct, allProducts,searchedProduct } from "./ApiHandle";
function Products() {
    const [Products, setProducts] = useState([]);
    const navigate = useNavigate();
    const handleRemove = (id) => {
        deleteProduct(id)
        allProducts(setProducts);
        console.log("r")
    }
    const handleEdit = (id) => {
        navigate("/update/" + id)
    }
    const searchProduct = (title)=>{
        searchedProduct(title,setProducts)
        console.log( Products )
        if(title===""){
            allProducts(setProducts);
        }
    }
    useEffect(() => {
        allProducts(setProducts);
        console.log("f")
    }, []);
    return (
        <div className="cm-container products">
            <h1>Products </h1>
            <input type='text' placeholder='search'  onChange={(event) => searchProduct(event.target.value)}/>
            
            {Products.map((item) => {
                return (
                    <ul key={item._id}>
                        <li>{item.title}</li>
                        <li>{item.para}</li>
                        <li>{item.price}</li>
                        <li><img src={"/imges/" + item.img} alt="img"/></li>
                        <li>
                            <button className='remove' onClick={() => handleRemove(item._id)}>x</button>
                            <button className='edit' onClick={() => handleEdit(item._id)}>i</button>
                        </li>
                    </ul>
                )
            })
            }
        </div>
    );
}

export default Products;

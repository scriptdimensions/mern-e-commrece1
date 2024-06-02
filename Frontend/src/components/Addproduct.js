import React from "react";
import { useLocation } from "react-router-dom";
import { addProduct, updateProduct, fetchProduct } from "./ApiHandle";

const Addproduct = () => {
    const location = useLocation();
    const { pathname } = location;

    const initial = {
        title: "",
        para: "",
        price: "",
        img: undefined
    }
    const [formData, setFormData] = React.useState(initial);
    const [formTitle, setFormtitle] = React.useState("title");
    const [ApiType, setApiType] = React.useState("Add");
    const [productId, setProductId] = React.useState(null);
    const [submitTitle, setSubmitTitle] = React.useState("button");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        console.log(formData)
    }

    const handleImageChange = (e) => {
        setFormData({ ...formData, img: e.target.files[0].name });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (ApiType === "Update") {
                await updateProduct(productId, formData);
            } else if (ApiType === "Add") {
                await addProduct(formData);
            }
            setFormData(initial);
        } catch (error) {
            console.error('Error:', error);
            // Handle error here
        }
    }

    React.useEffect(() => {
        if (pathname) {
            if (pathname === "/add") {
                setFormtitle("Add product");
                setSubmitTitle("Add");
                setApiType("Add");
            } else if (pathname.startsWith("/update/")) {
                setProductId(pathname.split("/")[2]);
                setFormtitle("edit product");
                setSubmitTitle("edit");
                setApiType("Update");
            }
        }
    }, [pathname, ApiType]);

    React.useEffect(() => {
        if (productId) {
            fetchProduct(productId, setFormData)
        }
        console.log("!null", productId)
    }, [productId]);
    return (
        <>
            <div className="form-container">
                <h2>{formTitle}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="col-span-full">
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">title: </label>
                        <div className="mt-2">
                            <input  type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange} id="title" autoComplete="title" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>                
                    <div>
                        <label>para:</label>
                        <input
                            type="text"
                            name="para"
                            value={formData.para}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <div>
                        <label>price:</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <div>
                        <label>price:</label>
                        <input
                            type="file"
                            name="img"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <button type="submit">{submitTitle}</button>
                </form>
            </div>
        </>
    );
};
export default Addproduct;
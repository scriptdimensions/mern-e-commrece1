async function allProducts(setProducts) {
    try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        if (response.ok) {
            setProducts(data);
        }
    } catch (error) {
        console.error('Errrrrrror:', error);
    }
}


async function addProduct(formData) {
    try {
        const response = await fetch('http://localhost:5000/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.ok) {
            return data; // Return data in case you need it in the component
        }
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error for handling in the component
    }
}

async function updateProduct(productId, formData) {
    try {
        const response = await fetch(`http://localhost:5000/product/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.ok) {
            return data; // Return data in case you need it in the component
        }
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error for handling in the component
    }
}
async function deleteProduct(id) {
    try {
        const response = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (response.ok) {
            return data; 
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
async function fetchProduct(productId,setFormData) {
    try {
        const response = await fetch(`http://localhost:5000/product/${productId}`);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            setFormData(data);
            return data; // Return data in case you need it in the component
        }
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error for handling in the component
    }
}
async function searchedProduct(title,setProducts) {
    try {
        const response = await fetch(`http://localhost:5000/search/${title}`);
        const data = await response.json();
      
        if (response.ok) {
            setProducts(data)
            return data; // Return data in case you need it in the component
        }
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error for handling in the component
    }
}
export { allProducts ,addProduct, updateProduct, fetchProduct,deleteProduct,searchedProduct };

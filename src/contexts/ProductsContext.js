import React, { createContext, useState, useEffect } from 'react';
export const ProductsContext = createContext()

const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await fetch(`${process.env.REACT_APP_HOST}/api/products?populate=*`);
        res.json()
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => console.log("error :", err));
    }

    return (
        products && <ProductsContext.Provider value={{ products }} >
            {children}
        </ProductsContext.Provider>
    );
}

export default ProductsContextProvider;
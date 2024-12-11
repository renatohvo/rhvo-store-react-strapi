import React, { useState } from 'react';
import ProductItem from './ProductItem';
import styles from './ProductsGrid.module.scss';
import { useProducts } from '../../hooks/useProducts';
import ProductSearch from './ProductSearch';

const ProductsGrid = () => {

    const { products } = useProducts()
    const [filteredProducts, setFilteredProducts] = useState(products)

    const onProductSearch = (search) => {
        if (search.trim() === '') {
            setFilteredProducts(products)
        } else {
            const filtered = products.filter(product =>
                product.attributes.title.toLowerCase().includes(search.toLowerCase())
            )
            setFilteredProducts(filtered)
        }
    };

    return (
        <div className={styles.p__container}>
            <div className="row">
                <div className="col-sm-8">
                    <div className="py-3">
                        {filteredProducts.length} Products {filteredProducts.length < products.length ? `Filtered` : `Total`}
                    </div>
                </div>
                <ProductSearch onProductSearch={onProductSearch} />
            </div>
            <div className={styles.p__grid}>

                {
                    filteredProducts.map(product => (
                        <ProductItem key={product.id} product={product} />
                    ))
                }

            </div>
            <div className={styles.p__footer}>

            </div>
        </div>
    );
}

export default ProductsGrid;
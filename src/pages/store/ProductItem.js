import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../../hooks/useCart';
import { formatNumber, calcPrice } from '../../helpers/utils';

const ProductItem = ({ product }) => {

    const { addProduct, cartItems, increase } = useCart();

    const isInCart = product => {
        return !!cartItems.find(item => item.id === product.id);
    }

    const priceCalc = calcPrice(product.attributes.price, product.attributes.discount);

    return (
        <div className="card card-body">
            <img style={{ display: "block", margin: "0 auto 10px", height: "200px", width: "300px" }} className="img-fluid"
                src={product.attributes.main_image.data.attributes.url + '?v=' + product.id} alt="" />
            <p>{product.attributes.title}</p>
            <h3 className="text-left">{formatNumber(priceCalc)}</h3>
            <div className="text-right">
                <Link to={`/product/${product.id}`} className="btn btn-link btn-sm mr-2">Detalhes</Link>
                {
                    isInCart(product) &&
                    <button
                        onClick={() => increase(product)}
                        className="btn btn-outline-primary btn-sm">Adicionar mais</button>
                }
                {
                    !isInCart(product) &&
                    <button
                        onClick={() => addProduct(product)}
                        className="btn btn-primary btn-sm">Adicionar ao carrinho</button>
                }
            </div>
        </div>
    );
}

export default ProductItem;
import React from 'react';

import { useCart } from '../../hooks/useCart';
import { formatNumber, calcPrice } from '../../helpers/utils';
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from '../../components/icons';

const CartItem = ({ product }) => {

    const { increase, decrease, removeProduct } = useCart();

    const priceCalc = calcPrice(product.attributes.price, product.attributes.discount);

    return (
        <div className="row no-gutters py-2">
            <div className="col-sm-2 p-2">
                <img
                    alt={product.attributes.title}
                    style={{ margin: "0 auto", maxHeight: "50px" }}
                    src={product.attributes.main_image.data.attributes.url} className="img-fluid d-block" />
            </div>
            <div className="col-sm-4 p-2">
                <h5 className="mb-1">{product.attributes.title}</h5>
                <p className="mb-1">Preço: {formatNumber(priceCalc)} </p>

            </div>
            <div className="col-sm-2 p-2 text-center ">
                <p className="mb-0">Qtd: {product.quantity}</p>
            </div>
            <div className="col-sm-4 p-2 text-right">
                <button
                    onClick={() => increase(product)}
                    className="btn btn-primary btn-sm mr-2 mb-1">
                    <PlusCircleIcon width={"20px"} />
                </button>

                {
                    product.quantity > 1 &&
                    <button
                        onClick={() => decrease(product)}
                        className="btn btn-danger btn-sm mb-1">
                        <MinusCircleIcon width={"20px"} />
                    </button>
                }

                {
                    product.quantity === 1 &&
                    <button
                        onClick={() => removeProduct(product)}
                        className="btn btn-danger btn-sm mb-1">
                        <TrashIcon width={"20px"} />
                    </button>
                }

            </div>
        </div>
    );
}

export default CartItem;
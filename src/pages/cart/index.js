import React from 'react';
import { Link } from 'react-router-dom';

import CartProducts from './CartProducts';
import Layout from '../../components/Layout';
import { useCart } from '../../hooks/useCart';
import { formatNumber } from '../../helpers/utils';

const Cart = () => {

    const { total, cartItems, itemCount, clearCart, checkout } = useCart();

    async function handleWhatsApp() {
        let pathWhatsApp = `http://wa.me/${process.env.REACT_APP_WHATSAPP}?text=Hello!%0AI%20want%20to%20order%20the%20following%20items%20from%20your%20store.%0A%0A`;
        for (let key in cartItems) {
            if (cartItems[key] !== null) pathWhatsApp += "Cod.:%20" + cartItems[key].id +"%20-%20" + cartItems[key].attributes.title + "%20(" + cartItems[key].quantity + "),%20%0A";
        }
        pathWhatsApp += "%0ATOTAL:%20R$%20" + total + ".%20%0A";
        pathWhatsApp += "%0A%0AThank%20you!";
        window.location.href = pathWhatsApp;
    }

    return (
        <Layout title="Cart" description="This is the Cart page" >
            <div >
                <div className="text-center mt-5">
                    <h1>Cart</h1>
                    <p>This is the Cart Page.</p>
                </div>

                <div className="row no-gutters justify-content-center">
                    <div className="col-sm-9 p-3">
                        {
                            cartItems.length > 0 ?
                                <CartProducts /> :
                                <div className="p-3 text-center text-muted">
                                    Your cart is empty
                                </div>
                        }

                        {checkout &&
                            <div className="p-3 text-center text-success">
                                <p>Checkout successfull</p>
                                <Link to="/" className="btn btn-outline-success btn-sm">BUY MORE</Link>
                            </div>
                        }
                    </div>
                    {
                        cartItems.length > 0 &&
                        <div className="col-sm-3 p-3">
                            <div className="card card-body">
                                <p className="mb-1">Total Items</p>
                                <h4 className=" mb-3 txt-right">{itemCount}</h4>
                                <p className="mb-1">Total Payment</p>
                                <h3 className="m-0 txt-right">{formatNumber(total)}</h3>
                                <hr className="my-4" />
                                <div className="text-center">
                                    <button type="button" className="btn btn-success mb-2" onClick={handleWhatsApp}>SEND TO WHATSAPP</button>
                                    <button type="button" className="btn btn-outlineprimary btn-sm" onClick={clearCart}>CLEAR</button>
                                </div>

                            </div>
                        </div>
                    }

                </div>
            </div>
        </Layout>
    );
}

export default Cart;
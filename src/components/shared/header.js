import React, { useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import { CartContext } from '../../contexts/CartContext';
import { CartIcon } from '../icons';
import styles from './header.module.scss';

const Header = () => {

    const { itemCount } = useContext(CartContext);
    const location = useLocation();

    const handleScrollToTop = () => {
        if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <header className={styles.header}>
            <Link to='/' onClick={handleScrollToTop}>Loja</Link>
            <Link to='/about'>Sobre</Link>
            <Link to='/cart'> <CartIcon /> Carrinho ({itemCount})</Link>
        </header>
    );
}

export default Header;
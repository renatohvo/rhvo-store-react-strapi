import React from 'react';
import styles from './footer.module.scss';

const Footer = () => {
    return (
        <footer className={`${styles.footer}  mt-5 p-3`}>
            2024 &copy; RHVO Store
        </footer>
    );
}

export default Footer;
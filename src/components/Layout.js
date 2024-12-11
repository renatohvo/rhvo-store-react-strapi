import React from 'react';
import Header from './shared/header';
import Footer from './shared/footer';

import { Helmet } from 'react-helmet-async';

import 'bootswatch/dist/lux/bootstrap.css'
import styles from './Layout.module.scss';

const Layout = ({ title, description, children }) => {
    return (
        <>
            <Helmet>
                <title>{title ? title + " - RHVO Store" : "RHVO Store"}</title>
                <meta name="description" content={description || "RHVO Store"} />
            </Helmet>
            <Header />
            <main className={`container ${styles.main}`}>
                {children}
            </main>
            <Footer />
        </>
    );
}

export default Layout;
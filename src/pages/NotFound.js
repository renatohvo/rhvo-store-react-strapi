import React from 'react';
import Layout from '../components/Layout';

const NotFound = () => {

    const center = {
        textAlign: 'center'
    }

    return (
        <Layout title="404" description="This is the 404 Page" >
            <div className="text-center mt-5" style={center}>
                <h1>404</h1>
                <p>This is the 404 Page.</p>
                <br />
                <h5>Página não Encontrada.</h5>
            </div>
        </Layout>
    );
}

export default NotFound;
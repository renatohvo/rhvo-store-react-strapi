import React from 'react';
import Layout from '../components/Layout';

const Loading = () => {

    const center = {
        textAlign: 'center'
    }

    return (
        <Layout title="Loading" description="Loading..." >
            <div className="text-center mt-5" style={center}>
                <h1>Carregando...</h1>
                <p>This is the Loading Page.</p>
                <br />
                <h5>Por favor, aguarde...</h5>
            </div>
        </Layout>
    );
}

export default Loading;
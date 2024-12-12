import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { GitHubIcon } from '../components/icons';
import Loading from "./Loading";

const About = () => {

    const [about, setAbout] = useState(() => {
        const cached = localStorage.getItem('about');
        return cached ? JSON.parse(cached) : null;
    });
    const [isLoading, setIsLoading] = useState(!about);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_HOST}/api/abouts`);
                const res = await response.json();

                // Verifica se o cache está desatualizado
                const cachedAbout = localStorage.getItem('about');
                if (cachedAbout) {
                    const cachedData = JSON.parse(cachedAbout);
                    const cachedTimestamp = cachedData.updatedAt;
                    const serverTimestamp = res.data[0].attributes.updatedAt;

                    if (cachedTimestamp === serverTimestamp) {
                        setAbout(cachedData); // Cache ainda válido
                        return;
                    }
                }

                // Atualiza cache se necessário
                setAbout(res.data);
                localStorage.setItem('about', JSON.stringify(res.data));
            } catch (error) {
                console.error("Error fetching about:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAbout();
    }, []);

    if (isLoading) return <Loading />;

    return (
        <Layout title="About" description="This is the About page">
            <div className="text-justify mt-5">
                <h1>Sobre</h1>
                <div>
                    {about.map((paragraph, index) => (
                        <>
                            <p key={index + 1}><b>{paragraph.attributes.title}</b></p>
                            <p key={index + 2}>{paragraph.attributes.description.split('\n')}</p>
                        </>
                    ))}
                </div>
                <a className="btn btn-primary" href="https://github.com/renatohvo">
                    <GitHubIcon width={"18px"} /> <span className="ml-2 mr-4">renatohvo</span>
                </a>
            </div>
        </Layout>
    );
};

export default About;

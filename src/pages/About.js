import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { GitHubIcon } from '../components/icons';
import Loading from "./Loading";

const About = () => {

    const [about, setAbout] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_HOST}/api/abouts`
                );
                const res = await response.json();
                setAbout(res.data);
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
        <Layout title="About" description="This is the About page" >
            <div className="text-justify mt-5">
                <h1>Sobre</h1>
                <div>
                    {about.map((paragraph, index) => (
                        <>
                            <p key={index}><b>{paragraph.attributes.title}</b></p>
                            <p key={index}>{paragraph.attributes.description.split('\n')}</p>
                        </>
                    ))}
                </div>
                <a className="btn btn-primary" href="https://github.com/renatohvo">
                    <GitHubIcon width={"18px"} /> <span className="ml-2 mr-4">renatohvo</span></a>
            </div>
        </Layout>
    );
}

export default About;
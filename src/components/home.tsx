import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/tasks');
    }, [navigate]);

    return null;
};

export default Home;
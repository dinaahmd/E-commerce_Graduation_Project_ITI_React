import React from 'react';

import { useState, useEffect } from 'react';

const useAuth = () => {
    const [authTokens, setAuthTokens] = useState(null);

    useEffect(() => {
        const tokens = JSON.parse(localStorage.getItem('authTokens'));
        if (tokens) {
            setAuthTokens(tokens);
        }
    }, []);

    const setTokens = (tokens) => {
        localStorage.setItem('authTokens', JSON.stringify(tokens));
        setAuthTokens(tokens);
    };

    const removeTokens = () => {
        localStorage.removeItem('authTokens');
        setAuthTokens(null);
    };

    return {
        authTokens,
        setTokens,
        removeTokens,
    };
};

export { useAuth };
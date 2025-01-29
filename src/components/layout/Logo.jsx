import React from 'react';

const Logo = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 100 100"
            style={{ backgroundColor: '#0066cc', borderRadius: '8px' }}
        >
            <text
                x="50"
                y="50"
                fontSize="45"
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="Arial, sans-serif"
            >
                B
            </text>
        </svg>
    );
};

export default Logo;
import React from 'react';

const LogoPlaceholder = ({ id, className = "" }) => {
    return (
        <div
            id={id}
            className={`h-12 w-32 border border-dashed border-gray-400 bg-gray-50 flex items-center justify-center ${className}`}
        >
            <span className="text-gray-400 text-xs text-center">Logo</span>
        </div>
    );
};

export default LogoPlaceholder;

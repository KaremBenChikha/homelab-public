import React from 'react';

const AvatarPlaceholder = ({ id, className = "" }) => {
    return (
        <div
            id={id}
            className={`w-20 h-20 rounded-full border-2 border-dashed border-gray-400 bg-gray-100 flex items-center justify-center ${className}`}
        >
            <span className="text-gray-500 text-xs">Avatar</span>
        </div>
    );
};

export default AvatarPlaceholder;

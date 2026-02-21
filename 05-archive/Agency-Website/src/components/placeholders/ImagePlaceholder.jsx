import React from 'react';

const ImagePlaceholder = ({ id, aspectRatio = "1/1", label, className = "" }) => {
    const ratioMap = {
        "1/1": "aspect-square",
        "4/3": "aspect-[4/3]",
        "16/9": "aspect-video",
        "3/4": "aspect-[3/4]",
    };

    return (
        <div
            id={id}
            className={`border-2 border-dashed border-gray-400 bg-gray-100 flex items-center justify-center p-4 ${ratioMap[aspectRatio] || ""} ${className}`}
        >
            <span className="text-gray-500 text-sm text-center font-mono">{label || id}</span>
        </div>
    );
};

export default ImagePlaceholder;

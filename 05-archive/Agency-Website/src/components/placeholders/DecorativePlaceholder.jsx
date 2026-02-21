import React from 'react';

const DecorativePlaceholder = ({ type, id, position, size = "md", color = "gray", className = "" }) => {
    const sizeMap = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
    };

    const style = position ? {
        position: 'absolute',
        ...position
    } : {};

    if (type === 'star') {
        return (
            <div id={id} style={style} className={`${sizeMap[size]} ${className}`}>
                <img src={`/assets/star-${color}.svg`} alt="Decorative Star" className="w-full h-full" />
            </div>
        );
    }

    if (type === 'badge') {
        // Badges are usually larger
        const badgeSize = size === 'lg' ? 'w-32 h-32' : 'w-24 h-24';
        return (
            <div id={id} style={style} className={`${badgeSize} ${className}`}>
                <img src="/assets/cta-badge.svg" alt="Badge" className="w-full h-full" />
            </div>
        );
    }

    return (
        <div
            id={id}
            style={style}
            className={`border border-dashed border-${color}-400 rounded-full flex items-center justify-center ${sizeMap[size]} ${className}`}
            title={`${type} placeholder`}
        >
            <span className="text-xs text-gray-400">{type[0].toUpperCase()}</span>
        </div>
    );
};

export default DecorativePlaceholder;

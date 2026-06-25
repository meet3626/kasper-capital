import React from 'react';

const OptimizedImage = ({ src, alt, className = "", width, height, ...props }) => {
  return (
    <img
      src={src}
      alt={alt || "BROKERCORESOLUTION Image"}
      className={`transition-opacity duration-300 ${className}`}
      loading="lazy"
      decoding="async"
      width={width}
      height={height}
      {...props}
    />
  );
};

export default OptimizedImage;

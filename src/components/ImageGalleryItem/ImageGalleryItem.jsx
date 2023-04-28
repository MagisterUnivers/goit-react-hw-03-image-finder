import React from 'react';

const ImageGalleryItem = ({ src, alt, onClick }) => (
  <li className="gallery-item">
    <img src={src} alt={alt} onClick={onClick} />
  </li>
);

export default ImageGalleryItem;

import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className="gallery">
    {images.map(({ id, webformatURL, tags }) => (
      <ImageGalleryItem
        key={id}
        src={webformatURL}
        alt={tags}
        onClick={() => onImageClick(id)}
      />
    ))}
  </ul>
);

export default ImageGallery;

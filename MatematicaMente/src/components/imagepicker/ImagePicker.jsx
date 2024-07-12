import React, { useState } from 'react';
import { Modal, Button, Image } from 'react-bootstrap';

const ImagePicker = ({ show, onHide, images, onImageSelect }) => {

  const handleImageClick = (image) => {
    onImageSelect(image);
    onHide();
  };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Selecciona tu foto de perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-wrap">
                {images.map((image, index) => (
                    <Image
                    key={index}
                    src={image}
                    thumbnail
                    className="m-2"
                    onClick={() => handleImageClick(image)}
                    style={{ cursor: 'pointer', width: '100px', height: '100px' }}
                    />
                ))}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ImagePicker;
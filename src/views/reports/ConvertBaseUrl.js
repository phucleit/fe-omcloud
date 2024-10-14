import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ConvertBaseUrl = ({ imageUrl }) => {
  const [base64Image, setBase64Image] = useState(null);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  useEffect(() => {
    const fetchAndConvertImage = async () => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const base64 = await getBase64(blob);
        setBase64Image(base64);
      } catch (error) {
        console.error('Error fetching and converting image:', error);
      }
    };

    fetchAndConvertImage();
  }, [imageUrl]);

  return <div>{base64Image ? <img src={base64Image} width="350" alt="Hicon" /> : <p>Loading image...</p>}</div>;
};

ConvertBaseUrl.propTypes = {
  imageUrl: PropTypes.string.isRequired
};

export default ConvertBaseUrl;

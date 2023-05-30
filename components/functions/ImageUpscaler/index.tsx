import React from 'react';
import { useState } from 'react';
import Upscaler from 'upscaler';

interface ImageUpscalerProps {
  url: string;
}

function ImageUpscaler({ url }: ImageUpscalerProps) {
  let base64Image = '';
  const upscaler = new Upscaler();
  upscaler.upscale(url).then(upscaledImage => {
    base64Image = upscaledImage;
    console.log(upscaledImage); // base64 representation of image src
  });

  return (
    <div>
      <img src={`data:image/png;base64,${base64Image}`} alt="Base64 Image" />
    </div>
  );
}

export default ImageUpscaler;
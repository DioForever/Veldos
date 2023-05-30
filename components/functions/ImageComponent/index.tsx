import { ReactNode } from 'react';
// import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
// import { HeartIcon as HeartFull } from '@heroicons/react/20/solid';
import './style.css';



interface ImageComponentProps {
  imageUrl: string;
}



const ImageComponent = ({ imageUrl }: ImageComponentProps) => {
  const target = document.getElementById("target");

  // Create a new image, set its src to the upscaled src,
  // and place it on the page
  // const img = document.createElement("img")
  // img.src = upscaledImageSrc
  // target?.appendChild(img)
  // target?.style.setProperty("background-image", `url(${upscaledImageSrc})`);
  // target?.style.setProperty("background-image", `url(${upscaledImageSrc})`);

  const imageStyle = {
    backgroundImage: `url(${imageUrl})`,
  };


  return <div className="image-container" style={imageStyle}>
    <div className='image-heart'>
      {/* <HeartFull /> */}
    </div>
    <img src="" alt="" id='target' />
  </div>;
};

export default ImageComponent;
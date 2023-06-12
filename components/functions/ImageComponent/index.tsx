import { Children, ReactNode } from 'react';
// import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
// import { HeartIcon as HeartFull } from '@heroicons/react/20/solid';
import './style.css';



interface ImageComponentProps {
  imageUrl: string;
  children?: ReactNode;
}



const ImageComponent = ({ imageUrl, children }: ImageComponentProps) => {

  const imageStyle = {
    backgroundImage: `url(${imageUrl})`,
  };


  return (
    <div className="image-container" style={imageStyle}>
      {children}
      {/* <img src="" alt="" id='target' /> */}
    </div>
  );
};

export default ImageComponent;
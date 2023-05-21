import React, { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import './style.css';

interface DescriptionComponentProps {
  text: string;
  maxLengthPercentage: number;
}

export default function DescriptionComponent({ text, maxLengthPercentage }: DescriptionComponentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxLength, setMaxLength] = useState(0);
  const [btnText, setBtnText] = useState<string>("Read More");

  useEffect(() => {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const calculatedMaxLength = (vw * maxLengthPercentage) / 100;
    setMaxLength(calculatedMaxLength);
  }, [maxLengthPercentage]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setBtnText(isExpanded ? "Read More" : "Read Less");
  };

  const displayText = isExpanded ? text : text.slice(0, maxLength) + "...";

  const containerStyle = {
    maxHeight: isExpanded ? 'none' : `${maxLength}px`,
    transition: `max-height ${200}ms ease`,
  };

  return (
    <div className="read-more-container" style={containerStyle}>
      <p>{displayText}</p>
      {text.length > maxLength && (
        <button className='showBtn' onClick={toggleExpand}>{btnText}</button>
      )}
    </div>
  );
};
import React, { useState } from 'react';

const ReadMoreParagraph = ({ text, maxLength = 400 }) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const isTextLong = text.length > maxLength;
  const displayedText = isExpanded ? text : text.substring(0, maxLength) + '...';

  const toggleText = () => setIsExpanded(!isExpanded);

  return (
    <div className='text'>
      <p>{displayedText} 
      {isTextLong && (
        <span className='readmore' onClick={toggleText}>{isExpanded ? 'Read Less' : 'Read More'}</span>
      )}
      </p>
    </div>
  );
};
export default ReadMoreParagraph;

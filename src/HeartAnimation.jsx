import { useState } from 'react';
import heartImage from './heart.png'; // Adjust the path to your image
import './HeartAnimation.css'; // Import the CSS for animations

const HeartAnimation = ({ onClick }) => {
  const [isFlying, setIsFlying] = useState(false); // Track if the heart is flying
  const [isVisible, setIsVisible] = useState(true); // Control visibility of the heart

  const handleClick = () => {
    if (isFlying) return; // Prevent multiple clicks
    setIsFlying(true); // Start the flying animation

    // Hide the heart and notify the parent component after the animation completes
    setTimeout(() => {
      setIsVisible(false); // Hide the heart
      onClick(); // Notify the parent component that the animation is complete
    }, 3000); // Match the duration of the flying animation
  };

  if (!isVisible) {
    return null; // Hide the heart component
  }

  return (
    <div className="heart-container">
      <img
        src={heartImage}
        alt="Heart"
        className={`heart ${isFlying ? 'fly' : ''}`}
        style={{
          width: '100px',
          height: '100px',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      />
    </div>
  );
};

export default HeartAnimation;
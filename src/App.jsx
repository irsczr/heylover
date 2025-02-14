import { useState, useEffect } from 'react';
import HeartAnimation from './HeartAnimation'; // Heart animation component
import './App.css'; // Import the CSS for animations

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showInputBox, setShowInputBox] = useState(false); // Controls the input box visibility
  const [typedText, setTypedText] = useState(''); // Stores the typed text
  const [inputValue, setInputValue] = useState(''); // Stores the input field value
  const [isButtonShaking, setIsButtonShaking] = useState(false); // Controls the button shake animation
  const [showSunflowers, setShowSunflowers] = useState(false); // Controls the sunflower animation
  const [showMessage, setShowMessage] = useState(false); // Controls the message box visibility
  const [isButtonVisible, setIsButtonVisible] = useState(false);

//login
  const handleLogin = () => {
    if (username === 'sushmitsetiya' && password === '22052003') {
      setIsLoggedIn(true); // Trigger the login transition
    } else {
      setShowHint(true);
    }
  };

  const handleHeartAnimationComplete = () => {
    setShowInputBox(true); // Show the input box after the heart animation completes
    startTypewriterEffect(); // Start the typewriter effect
  };

  //TypeWriter
  const startTypewriterEffect = () => {
    const text = " I love being your";
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setTypedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100); // Adjust typing speed here (100ms per character)
  };

  //Girl button
  const handleGirlButtonClick = () => {
    if (inputValue.toLowerCase() === 'favourite') {
      setShowSunflowers(true); // Show sunflowers
      setShowInputBox(false); // Hide the input box
    } else {
      setIsButtonShaking(true); // Shake the button if the input is wrong
      setTimeout(() => setIsButtonShaking(false), 500); // Stop shaking after 0.5 seconds
    }
  };


  // Sunflowers Component
  const Sunflowers = () => {
    setShowMessage(true);
    return (
      <div className="sunflowers-container">
        {Array.from({ length: 250 }).map((_, index) => {
          const leftPosition = Math.random() * 100; // Randomize position
          const animationDuration = 3 + Math.random() * 10; // Random fall speed
  
          return (
            <div
              key={index}
              className="sunflower"
              style={{
                left: `${leftPosition}vw`, // Place randomly across the screen width
                animationDuration: `${animationDuration}s`, // Random speed
              }}
            >
              🌻 🌱
            </div>
          );
        })}
      </div>
    );
  };

  //trigger post flower message
  useEffect(() => {
    if (showSunflowers) {
      // Display the message box 11 seconds after sunflowers start falling
      const messageTimer = setTimeout(() => {
        setShowMessage(true);
      }, 9000); // 11 seconds
  
      // Hide the message box after it has been displayed for 6 seconds
      const hideMessageTimer = setTimeout(() => {
        setShowMessage(false);
        setIsButtonVisible(true);
      }, 15000); // 11 seconds (sunflower fall) + 6 seconds (message display)
  
      // Clear timers if the component unmounts
      return () => {
        clearTimeout(messageTimer);
        clearTimeout(hideMessageTimer);
      };
    }
  });

  //message box 
  const MessageBox = () => (

    <div className="message-box">
      you're all the sunshine i've ever wanted, the light of my life
      ilysm         Baby, will you be my     v a l e n t i n e 💖
    </div>    
  );
//no
const handleNoClick = () => {
  const noButton = document.getElementById('noButton'); // Get the 'No' button element
  if (!noButton) return; // Handle cases where the button isn't found

  const maxX = window.innerWidth - noButton.offsetWidth;  // Max X position
  const maxY = window.innerHeight - noButton.offsetHeight; // Max Y position

  let newX, newY;

  do {  // Ensure the new position is different
    newX = Math.random() * maxX;
    newY = Math.random() * maxY;
  } while (Math.abs(newX - noButton.offsetLeft) < 50 &&  // Adjust 50 for sensitivity
           Math.abs(newY - noButton.offsetTop) < 50);


  noButton.style.position = 'absolute'; // Important for positioning
  noButton.style.left = newX + 'px';
  noButton.style.top = newY + 'px';

};

const handleYesClick = () => {
  alert('I love you now call me back');
  setIsButtonVisible(false); // Hide the buttons after clicking 'Yes'
};

  return (
    <div className="container" >
      {!isLoggedIn ? (
        <div className="rectangle">
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field "
          />
          <button onClick={handleLogin} className="enter-button">
            Enter
          </button>
          {showHint && <p className="hint">my birthday</p>}
        </div>
      ) : (
        <>
          <HeartAnimation onClick={handleHeartAnimationComplete} />
          {showInputBox && (
            <div className="input-box">
              <p>{typedText}</p>
              {typedText === "I love being your" && (
                <>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder='<3 type here <3'
                    className="input-field-fav"
                  />
                  <button
                    onClick={handleGirlButtonClick}
                    className={`girl-button ${isButtonShaking ? 'shake' : ''}`}
                  >
                    girl
                  </button>
                </>
              )}
            </div>
          )}
         {showSunflowers && <Sunflowers />}
         {showMessage && <MessageBox />}
      
         <div className="app-container">
            <div className="bg-image">
            {isButtonVisible && (
              <div className="button-container">
                <button onClick={handleYesClick} className="action-button">
                Yes
              </button>
              <button onClick={handleNoClick} className="action-button">
                No
              </button>
            </div>
           )}
         </div>
     </div>
        </>
      )}
    </div>
  );
};

export default App;
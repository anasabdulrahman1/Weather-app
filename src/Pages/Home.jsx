import React, { useState } from 'react';
import './Styles/Home.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


function Home() {
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();  

  const handleGetStarted = () => {
    setLoading(true);  

 
    setTimeout(() => {
      setLoading(false);
      navigate('/weather');  
    }, 3000);  
  };

  return (
    <>
      <div className="main-ctr">
        {loading ? (
          <div className="loading-animation">
          <FontAwesomeIcon icon={faSpinner} spin className="multi-color-spinner" size="4x" />
          </div>
        ) : (
          <button className="home-btn" onClick={handleGetStarted}>
          <div>Get Weather</div>
        </button>
        )}
      </div>



    </>
  );
}

export default Home;


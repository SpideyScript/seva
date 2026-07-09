import React from 'react';
import { CirclePlus, 
  UsersRound, 
  Search,
  Map

 } from 'lucide-react';
 import { useNavigate } from 'react-router-dom';
 import { useAuth } from "../context/AuthContext";

const Banner = () => {
 const navigate = useNavigate();
   const {user} = useAuth();

  const handleClick = () => { 
    if(user) {
      navigate("/Userdashboard/post-problem");
    }else {
      navigate("/login");
    }
  }
  
  return (
    <div className="hero">
      <div className="hero-inner">

        <div className="badge badge-blue" style={{ width: 'fit-content' }}>
          🇮🇳 Trusted by 2L+ customers across India
        </div>

        <h1>Find <span>Trusted</span> Local Professionals Near You</h1>
        <p>Post your problem, get quotes from verified experts, hire in minutes.</p>

        <div className="hero-search">
          <Search
            style={{
              color: 'var(--gray)',
              paddingLeft: '8px',
              alignSelf: 'center',
              width: '30px',
              height: '30px'
            }}
          />
          {/* Controlled input for service */}
          <input
            type="text"
            placeholder="What service do you need? e.g. AC Repair, Plumber..."


          />

          {/* Controlled input for location */}
          <Map  style={{
              color: 'var(--gray)',
              paddingLeft: '8px',
              alignSelf: 'center',
              width: '30px',
              height: '30px'
            }} />
          <input
            type="text"
            placeholder="Your location"
            style={{ maxWidth: '180px' }}


          />

          <button className="btn btn-primary">
            <Search size={16} strokeWidth={1.5} /> Search
          </button>
        </div>

        <div className="hero-btns">
          <button className="btn btn-amber" 
          onClick={handleClick}>
            <CirclePlus size={20} /> Post a Problem
          </button>

          <button
            className="btn"
            style={{ background: 'rgba(255,255,255,.15)', color: 'var(--white)', border: '1.5px solid rgba(255,255,255,.3)' }}

          >
            <UsersRound size={20} /> Browse Professionals
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner

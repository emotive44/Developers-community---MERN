import React from 'react';
import './ProfileHeader.css';


const ProfileHeader = ({ 
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar }
  }
}) => {
  
  return (
    <div className="profile-top bg-primary p-2">
      <img
        src={avatar}
        alt="profile image"
        className="round-img my-1"
      />
      <h1 className="large">{name}</h1>
      <p className={`${location && 'lead'}`}>
        {status} {company && `at ${company}`}
      </p>
      {location && <p>{location}</p>}
      {social &&
        <div className="icons my-1">
          {website && <a href={website} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x" />
            </a>
          }
          {social.twitter && <a href={social.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x" />
            </a>
          }
          {social.facebook && <a href={social.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x" />
            </a>
          }
          {social.linkedIn && <a href={social.linkedIn} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x" />
            </a>
          }
          {social.youtube && <a href={social.youtube} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube fa-2x" />
            </a>
          }
          {social.instagram && <a href={social.instagram} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram fa-2x" />
            </a>
          }
        </div>
      }
    </div>
  );
}

export default ProfileHeader;

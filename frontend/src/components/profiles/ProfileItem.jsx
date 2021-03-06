import React from 'react';
import { Link } from 'react-router-dom';


const ProfileItem = ({ 
  profile: {
    user: { _id, name, avatar },
    status,
    skills,
    company,
    location
  }
}) => {

  return (
    <div className="profile bg-light">
      <img
        className="round-img my-1"
        src={avatar}
        alt=""
      />
      <div>
        <h1 className="large">{name}</h1>
        <p className="lead">{status} {company && <span>at {company}</span>}</p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profiles/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {skills.length > 0 && skills.map((skill, index) => (
          <li className="text-primary" key={index}>
            <i className="fas fa-check" /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileItem;

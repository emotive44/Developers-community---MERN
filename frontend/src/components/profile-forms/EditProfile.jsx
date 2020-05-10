import React, { useState, Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { connect } from 'react-redux'; 
import { createAndUpdateProfile, getCurrentProfile } from '../../actions/profile';

import './CreateAndEditProfile.css';


const EditProfile = ({ getCurrentProfile, createAndUpdateProfile, profile: { profile } }) => {
  const history = useHistory();
  const [displaySocials, setDisplaySocials] = useState(false);
  const [formData, setFormData] = useState({
    bio: profile ? profile.bio : '',
    status: profile ? profile.status : '',
    company: profile ? profile.company : '',
    website: profile ? profile.website : '',
    location: profile ? profile.location : '',
    skills: profile ? profile.skills.join(',') : '',
    githubUsername: profile ? profile.githubUsername : '',
    twitter: profile && profile.social ? profile.social.twitter : '',
    youtube: profile && profile.social ? profile.social.youtube : '',
    linkedIn: profile && profile.social ? profile.social.linkedIn :'',
    facebook: profile && profile.social ? profile.social.facebook : '',
    instagram: profile && profile.social ? profile.social.instagram : ''
  });

  const {
    bio,
    status,
    skills,
    company,
    twitter,
    youtube,
    website,
    linkedIn,
    facebook,
    location,
    instagram,
    githubUsername
  } = formData

  const toggleSocials = () => {
    setDisplaySocials(prev => !prev);
  }

  const createProfileHandler = e => {
    e.preventDefault();
    createAndUpdateProfile(formData, history, true);
  }

  const inputHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  
  return (
    <Fragment>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"/>    Let's get some information to make your
        profile stand out
      </p>
      <span>* = required field</span>
      <form className="form" onSubmit={createProfileHandler}>
        <div className="form-group">
          <select name="status" value={status} onChange={inputHandler}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <span className="form-text">
            Give us an idea of where you are at in your career
          </span>
        </div>
        <div className="form-group">
          <input 
            type="text" 
            name="company" 
            placeholder="Company" 
            value={company}
            onChange={inputHandler}
          />
          <span className="form-text">
            Could be your own company or one you work for
          </span>
        </div>
        <div className="form-group">
          <input 
            type="text" 
            name="website" 
            placeholder="Website"
            value={website}
            onChange={inputHandler}
          />
          <span className="form-text"
            >Could be your own or a company website
          </span>
        </div>
        <div className="form-group">
          <input 
            type="text" 
            name="location" 
            placeholder="Location" 
            value={location}
            onChange={inputHandler}
          />
          <span className="form-text">
            City & state suggested (eg. Boston, MA)
          </span>
        </div>
        <div className="form-group">
          <input 
            type="text" 
            name="skills" 
            placeholder="* Skills"
            value={skills}
            onChange={inputHandler}
          />
          <span className="form-text">
            Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)
          </span>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="githubUsername"
            placeholder="Github Username"
            value={githubUsername}
            onChange={inputHandler}
          />
          <span className="form-text">
            If you want your latest repos and a Github link, include your username
          </span>
        </div>
        <div className="form-group">
          <textarea 
            name="bio"
            placeholder="A short bio of yourself" 
            value={bio}
            onChange={inputHandler}
          />
          <span className="form-text">Tell us a little about yourself</span>
        </div>

        <div className="my-2">
          <button type="button" className="btn btn-light" onClick={toggleSocials}>
            {displaySocials ? 'Hide' : 'Show'} Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocials && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input 
                type="text" 
                name="twitter"
                placeholder="Twitter URL"
                value={twitter}
                onChange={inputHandler}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input 
                type="text" 
                name="facebook" 
                placeholder="Facebook URL" 
                value={facebook}
                onChange={inputHandler}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input 
                type="text" 
                name="youtube" 
                placeholder="YouTube URL"
                value={youtube}
                onChange={inputHandler} 
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input 
                type="text"
                name="linkedIn" 
                placeholder="Linkedin URL" 
                value={linkedIn}
                onChange={inputHandler}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input 
                type="text" 
                name="instagram" 
                placeholder="Instagram URL" 
                value={instagram}
                onChange={inputHandler}
              />
            </div>
          </Fragment>
        )}
        <input type="submit" className="btn btn-primary my-1" value='Edit Profile' />
        <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link>
      </form>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createAndUpdateProfile, getCurrentProfile })(EditProfile);

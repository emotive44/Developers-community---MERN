import React, { useState, Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { connect } from 'react-redux'; 
import { createAndUpdateProfile } from '../../actions/profile';

import SocialNetworkLinks from './SocialNetworkLinks';
import FormHeader from './FormHeader';
import Input from '../common/Input';
import './CreateAndEditProfile.css';


const CreateOrEditProfile = ({ createAndUpdateProfile, profile: { profile }, types }) => {
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
    const isEdit = types === 'Edit' ? true : false;
   
    e.preventDefault();
    createAndUpdateProfile(formData, history, isEdit);
  }

  const inputHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  
  return (
    <Fragment>
      <FormHeader type={types}/>
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
        <Input 
          type='text'
          name='company'
          value={company}
          placeholder='Company'
          inputHandler={inputHandler}
          msg='Could be your own company or one you work for'
        />
        <Input 
          type='text'
          name='website'
          value={website}
          placeholder='Website'
          inputHandler={inputHandler}
          msg='Could be your own or a company website'
        />
        <Input 
          type='text'
          name='location'
          value={location}
          placeholder='Location'
          inputHandler={inputHandler}
          msg='City & state suggested (eg. Boston, MA)'
        />
        <Input 
          type='text'
          name='skills'
          value={skills}
          placeholder='* Skills'
          inputHandler={inputHandler}
          msg='Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)'
        />
        <Input 
          type='text'
          name='githubUsername'
          value={githubUsername}
          placeholder='Github Username'
          inputHandler={inputHandler}
          msg='If you want your latest repos and a Github link, include your username'
        />
        <Input 
          textarea
          name='bio'
          value={bio}
          inputHandler={inputHandler}
          placeholder='A short bio of yourself'
          msg='Tell us a little about yourself'
        />
        <div className="my-2">
          <button type="button" className="btn btn-light" onClick={toggleSocials}>
            {displaySocials ? 'Hide' : 'Show'} Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocials && (<SocialNetworkLinks 
          socials={{
            twitter,
            facebook,
            youtube,
            linkedIn,
            instagram,
            inputHandler
          }}/>)
        }
        <input type="submit" className="btn btn-primary my-1" value={`${types} Profile`} />
        <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link>
      </form>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createAndUpdateProfile })(CreateOrEditProfile);

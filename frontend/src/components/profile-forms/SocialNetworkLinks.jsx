import React, { Fragment } from 'react';
import './SocialNetworkLinks.css';

const SocialNetworkLinks = (props) => {
  const {
    twitter,
    youtube,
    linkedIn,
    facebook,
    instagram,
    inputHandler
  } = props.socials;

  return (
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
  )
}

export default SocialNetworkLinks;

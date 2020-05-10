import React, { Fragment } from 'react';
import './SocialNetworkLinks.css';
import Input from '../common/Input';

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
      <Input 
        type="text" 
        name="twitter"
        value={twitter}
        className='twitter'
        inputHandler={inputHandler}
        placeholder="Twitter URL"
      /> 
      <Input 
        type="text" 
        name="facebook"
        value={facebook}
        className='facebook'
        inputHandler={inputHandler}
        placeholder="Facebook URL"
      /> 
      <Input 
        type="text" 
        name="youtube"
        value={youtube}
        className='youtube'
        inputHandler={inputHandler}
        placeholder="Youtube URL"
      /> 
      <Input 
        type="text" 
        name="linkedIn"
        value={linkedIn}
        className='linkedin'
        inputHandler={inputHandler}
        placeholder="Linkedin URL"
      /> 
      <Input 
        type="text" 
        name="instagram"
        value={instagram}
        className='instagram'
        inputHandler={inputHandler}
        placeholder="Instagram URL"
      /> 
    </Fragment>
  )
}

export default SocialNetworkLinks;

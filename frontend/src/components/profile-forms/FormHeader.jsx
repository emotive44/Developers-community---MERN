import React, { Fragment } from 'react';


const FormHeader = props => {
  return (
    <Fragment>
      <h1 className="large text-primary">
        {props.type} Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"/>    Let's get some information to make your
        profile stand out
      </p>
      <span>* = required field</span>
    </Fragment>
  );
}

export default FormHeader;

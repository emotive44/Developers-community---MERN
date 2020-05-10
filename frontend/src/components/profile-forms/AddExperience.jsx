import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';


const AddExperience = ({ addExperience }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    to: '',
    from: '',
    title: '',
    company: '',
    location: '',
    current: false,
    description: ''
  });
  const [toDisable, setToDisable] = useState(false);
  const {
    to,
    from,
    title,
    company,
    current,
    location,
    description
  } = formData;

  const inputHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const addEducationHandler = e => {
    e.preventDefault();
    console.log(formData);
    addExperience(formData, history);
  }

  return (
    <Fragment>
       <h1 className="large text-primary"> Add An Experience </h1>
      <p className="lead">
        <i className="fas fa-code-branch"/> Add any developer/programming
        positions that you have had in the past
      </p>
      <span>* = required field</span>
      <form className="form" onSubmit={addEducationHandler}>
        <div className="form-group">
          <input 
            required 
            type="text" 
            name="title" 
            placeholder="* Job Title"
            value={title}
            onChange={inputHandler}
          />
        </div>
        <div className="form-group">
          <input 
            required 
            type="text" 
            name="company" 
            placeholder="* Company" 
            value={company}
            onChange={inputHandler}
          />
        </div>
        <div className="form-group">
          <input 
            type="text" 
            name="location" 
            placeholder="Location"
            value={location}
            onChange={inputHandler}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input 
            type="date" 
            name="from" 
            value={from}
            onChange={inputHandler}
          />
        </div>
         <div className="form-group">
          <p>
            <input 
              type="checkbox" 
              name="current" 
              value={current} 
              checked={current}
              onChange={(e) => { 
                setFormData( {...formData, current: !current} );
                setToDisable(!toDisable); 
              }}
            /> Current Job
            </p>
        </div>
        {!toDisable && (
          <div className="form-group">
            <h4>To Date</h4>
            <input 
              type="date" 
              name="to"
              value={to}
              onChange={inputHandler}
            />
          </div>
        )}
        <div className="form-group">
          <textarea
            rows="5"
            cols="30"
            name="description"
            placeholder="Job Description"
            value={description}
            onChange={inputHandler}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link>
      </form>
    </Fragment>
  )
}

export default connect(null, { addExperience })(AddExperience);

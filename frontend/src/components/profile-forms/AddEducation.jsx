import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { addExperienceOrEducation } from '../../actions/profile';


const AddEducation = ({ addExperienceOrEducation }) => {
  const history = useHistory();
  const [toDisable, setToDisable] = useState(false);
  const [formData, setFormData] = useState({
    to: '',
    from: '',
    school: '',
    degree: '',
    current: false,
    description: '',
    fieldOfStudy: ''
  });
  const {
    to,
    from,
    school,
    degree,
    current,
    description,
    fieldOfStudy
  } = formData

  const inputHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const addEducationHandler = e => {
    e.preventDefault();
    console.log(formData);
    addExperienceOrEducation(formData, history, 'education');
  }

  return (
    <Fragment>
      <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap" /> Add any school, bootcamp, etc that
        you have attended
      </p>
      <span>* = required field</span>
      <form className="form" onSubmit={addEducationHandler}>
        <div className="form-group">
          <input
            required
            type="text"
            name="school"
            placeholder="* School or Bootcamp"
            value={school}
            onChange={inputHandler}
          />
        </div>
        <div className="form-group">
          <input
            required
            type="text"
            name="degree"
            placeholder="* Degree or Certificate"
            value={degree}
            onChange={inputHandler}
          />
        </div>
        <div className="form-group">
          <input 
            type="text" 
            name="fieldOfStudy" 
            placeholder="Field Of Study" 
            value={fieldOfStudy}
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
              checked={toDisable}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                setToDisable(!toDisable);
              }}
            /> Current School or Bootcamp
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
            placeholder="Program Description"
            value={description}
            onChange={inputHandler}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link>
      </form>
    </Fragment>
  );
}

export default connect(null, { addExperienceOrEducation })(AddEducation);
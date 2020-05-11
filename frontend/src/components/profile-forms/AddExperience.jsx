import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { addExperienceOrEducation } from '../../actions/profile';

import Input from '../common/Input';


const AddExperience = ({ addExperienceOrEducation }) => {
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
    addExperienceOrEducation(formData, history, 'experience');
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
        <Input
          required
          type='text'
          name='title'
          value={title}
          placeholder='* Job Title'
          inputHandler={inputHandler}
        />
        <Input
          required
          type='text'
          name='company'
          value={company}
          placeholder='* Company'
          inputHandler={inputHandler}
        />
         <Input
          type='text'
          name='location'
          value={location}
          placeholder='Location'
          inputHandler={inputHandler}
        />
        <h4>From Date</h4>
         <Input
          type='date'
          name='from'
          value={from}
          inputHandler={inputHandler}
        />
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
        {!toDisable && 
          <Fragment>
            <h4>To Date</h4>
             <Input
                type='date'
                name='to'
                value={to}
                inputHandler={inputHandler}
              />
          </Fragment>
        }
        <Input
          textarea
          name='description'
          value={description}
          placeholder="Job Description"
          inputHandler={inputHandler}
        />
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link>
      </form>
    </Fragment>
  )
}

export default connect(null, { addExperienceOrEducation })(AddExperience);

import React, { Fragment } from 'react';
import Moment from 'react-moment';

import { connect } from 'react-redux';
import { deleteExperienceOrEducation } from '../../actions/profile';

import './ExperienceOrEducation.css';


const Experience = ({ experience, education, deleteExperienceOrEducation }) => {
  return (
    <Fragment>
      <h2 className="my-2">
        {experience ? 'Experience' : 'Education'} Credentials
      </h2>
      <table className="table table-education">
        <thead>
          <tr>
            <th>
              {experience ? 'Company' : 'School'}
            </th>
            <th className="hide-sm">
              {experience ? 'Title' : 'Degree'}
            </th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experience
            ? experience.map(exp => (
              <tr key={exp._id}>
                <td>{exp.company}</td>
                <td className="hide-sm">{exp.title}</td>
                <td>
                  <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - 
                  {exp.to === null ? ' Now' : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
                </td>
                <td className='center-button'>
                  <button className="btn btn-danger" onClick={() => deleteExperienceOrEducation(exp._id, null)}>
                    Delete
                  </button>
                </td>
              </tr>
              ))
            : education.map(educ => (
              <tr key={educ._id}>
                <td>{educ.school}</td>
                <td className="hide-sm">{educ.degree}</td>
                <td>
                  <Moment format='YYYY/MM/DD'>{educ.from}</Moment> - 
                  {educ.to === null ? ' Now' : <Moment format='YYYY/MM/DD'>{educ.to}</Moment>}
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => deleteExperienceOrEducation(null, educ._id)}>
                    Delete
                  </button>
                </td>
              </tr>
              ))
          }
        </tbody>
      </table>
    </Fragment>
  );
}

export default connect(null, {deleteExperienceOrEducation})(Experience);

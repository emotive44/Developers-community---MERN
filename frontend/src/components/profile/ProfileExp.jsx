import React, { Fragment } from 'react';
import './ProfileExpEduc.css';

import Moment from 'react-moment';

const ProfileExp = ({ experiences }) => {
  if(experiences.length < 1) {
    return <h4 className='text-center'>No experience credentials</h4>
  }

  return (
    <div className="profile-exp bg-white p-2">
      {experiences.map((exp, index) => (
        <Fragment key={index}>
          <div>
            <h2 className="text-primary">Experience</h2>
            <h3 className="text-dark">{exp.company}</h3>
            <p>
              <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {' '}
              {exp.to === null ? 'To now' : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
            </p>
            <p><strong>Position: </strong>{exp.title}</p>
            {exp.description && <p>
                <strong>Description: </strong> {exp.description}
              </p>
            }
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default ProfileExp;

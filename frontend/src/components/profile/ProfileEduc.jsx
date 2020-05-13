import React, { Fragment } from 'react';
import './ProfileExpEduc.css';

import Moment from 'react-moment';

const ProfileEduc = ({ educations }) => {
  if(educations.length < 1) {
    return <h4 className='text-center'>No education credentials</h4>
  }

  return (
    <div className="profile-edu bg-white p-2">
      {educations.map((educ, index) => (
        <Fragment key={index}>
          <div>
          <h2 className="text-primary">Education</h2>
            <h3 className="text-dark">{educ.school}</h3>
            <p>
              <Moment format='YYYY/MM/DD'>{educ.from}</Moment> - {' '}
              {educ.to === null ? 'To now' : <Moment format='YYYY/MM/DD'>{educ.to}</Moment>}
            </p>
            <p><strong>Degree: </strong>{educ.degree}</p>
            <p><strong>Field Of Study: </strong>{educ.fieldOfStudy}</p>
            {educ.description && <p>
                <strong>Description: </strong> {educ.description}
              </p>
            }
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default ProfileEduc;

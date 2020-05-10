import React from 'react';

const Input = props => {
  const  {
    msg,
    type,
    name,
    value,
    minLength,
    placeholder,
    inputHandler,
    required,
    textarea,
    className
  } = props;

  return(
    <div className={`form-group ${className ? 'social-input' : null}`}>
      {className && <i className={`fab fa-${className} fa-2x`} />}
      {textarea
        ? <textarea 
            name={name}
            value={value}
            onChange={inputHandler}
            placeholder={placeholder}
            required={required ? true : false}
          />
        : <input
            type={type}
            name={name}
            value={value}
            onChange={inputHandler}
            placeholder={placeholder}
            required={required ? true : false}
            minLength={minLength ? +minLength : false}
          />
      }
      <span className="form-text">
        {msg}
      </span>
    </div>
  );
}

export default Input;

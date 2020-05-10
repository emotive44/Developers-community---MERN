import React from 'react';

const Input = props => {
  const  {
    msg,
    type,
    name,
    value,
    placeholder,
    inputHandler,
    required,
    textarea,
  } = props;

  return(
    <div className="form-group">
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
          />
      }
      <span className="form-text">
        {msg}
      </span>
    </div>
  );
}

export default Input;

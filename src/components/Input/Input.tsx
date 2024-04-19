import React from 'react'
import "./Input.css"

type InputProps = {
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    children?: string,
    regex?: RegExp,
    isError?: boolean,
    onError?: () => void,
    errorMessage?: string,
    required?: boolean,
}

const Input = ({
    placeholder, 
    value, 
    onChange, 
    children,
    regex,
    onError,
    isError,
    errorMessage,
    required,
}:InputProps): React.ReactElement => {
  return <div
    className="input-container"
  >
    <div className="labels">
        <label className="label">
            {children}
        </label>
        {
            isError
                ? <label className='label label--error'>
                    {
                        errorMessage
                            ? errorMessage
                            : "Invalid value"
                    }
                </label>
                : null
        }
    </div>
    <input 
        className="input__input"
        type="text" 
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
            if(typeof regex != "undefined")
                if(regex.test(value))
                    if(typeof onError != "undefined")
                        onError();
            onChange(e);
        }}
        required={required}
    />
  </div>
  
}

export default Input

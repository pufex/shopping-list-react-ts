import React from 'react'
import "./Input.css"

type InputProps = {
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    children?: string,
    isInvalid?: boolean,
    errorMessage?: string,
}

const Input = ({
    placeholder, 
    value, 
    onChange, 
    children,
    isInvalid,
    errorMessage
}:InputProps): React.ReactElement => {
  return <div
    className="input-container"
  >
    <div className="labels">
        <label className="label">
            {children}
        </label>
        {
            isInvalid
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
        onChange={onChange}
    />
  </div>
  
}

export default Input

import React, { useState } from 'react'
import { GiCheckMark } from "react-icons/gi";
import "./Checkbox.css"

type CheckboxProps = {
    checked: boolean,
    onCheck: () => void,
    children: string,

}
 
const Checkbox = ({onCheck, children, checked}:CheckboxProps) => {

    return <div className='checkbox-container'
        onClick={onCheck}
    >
        <div className={
            checked
                ? "checkbox active"
                : "checkbox"
        }>
            <GiCheckMark 
                color='white'
                size={30}
            />
        </div>
        <label className="checkbox__label">
            {children}
        </label>
    </div>

}

export default Checkbox

import React from 'react';

const Button = ({btn_label, btn_function}) => {

    return (
        <div className="button-div">
            <button className="button" value={btn_label} onClick={btn_function}>{btn_label}</button>
        </div>
    )
}

export default Button;
import React from 'react';

const Button = ({btn_label, btn_function}) => {

    function handleClick(e) {
        btn_function(e);
    }

    return (
        <div className="button-div">
            <button className="button" value={btn_label} onClick={handleClick}>{btn_label}</button>
        </div>
    )
}

export default Button;
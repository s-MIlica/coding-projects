import React from 'react';

function Button({btn_label, btn_function, style}) {
    function handleClick() {
        btn_function()
    }

    return (
        <div className="button-div" style={style}>
            <button className="button" onClick={handleClick}>{btn_label}</button>
        </div>
    )
}

export default Button;


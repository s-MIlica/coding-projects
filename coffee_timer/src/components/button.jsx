import React from 'react';

function Button({btn_label, btn_function, style, btn_id}) {
    function handleClick() {
        btn_function()
    }

    return (
        <div className="button-div" style={style}>
            <button className="button" onClick={handleClick} id={btn_id}>{btn_label}</button>
        </div>
    )
}

export default Button;


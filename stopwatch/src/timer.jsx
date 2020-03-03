import React, { useState, useEffect } from 'react';

function Timer() {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isTimerOn, setIsTimerOn] = useState(false);
    
    function toggleTimer() {
        setIsTimerOn(!isTimerOn);
    }

    useEffect(() => {
        let tikTok = null;
        if (isTimerOn) {
                tikTok = setInterval(() => {
                    if (seconds < 59) {
                        setSeconds(() => seconds + 1)
                    } else {
                        setMinutes(() => minutes + 1);
                        setSeconds(0);
                    }
            }, 1000);
        } else {
            clearInterval(tikTok);
            setSeconds(0);
            setMinutes(0);
        }

        return () => {clearInterval(tikTok)}
    }, [isTimerOn, seconds, minutes])

    return (
        <div className="timer-main-div">
            <div className="seconds">
               {minutes < 10? '0' + minutes : minutes}:{seconds < 10? '0' + seconds : seconds}s
            </div>
            <button className="button" onClick={toggleTimer}> {isTimerOn? 'STOP' : 'START'} </button>
        </div>
    )

}

export default Timer;
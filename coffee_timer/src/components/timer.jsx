import React, { useState, useEffect } from 'react';
import Button from './button';

function Timer() {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isTimerOn, setIsTimerOn] = useState(false);
    console.log('is timer on?', isTimerOn);

    function toggle() {
        setIsTimerOn(!isTimerOn);
    }

    function stop() {
        if (isTimerOn) {
            setMinutes(0);
            setSeconds(0);
            toggle();
        }
    }

    function addOneMinute() {
        setMinutes(() => minutes + 1)
    }

    useEffect(() => {
        let tikTok = null;
        const audioEl = document.getElementsByClassName("audio-element")[0]
        
        if (isTimerOn) {
            tikTok = setInterval(() => {
                if (seconds < 60 && seconds > 0 && minutes === 0) {
                    setSeconds(() => seconds - 1);
                } else if (minutes > 0 && seconds === 0 ) {
                    setMinutes(() => minutes - 1);
                    setSeconds(59);
                } else if (minutes > 0 && seconds > 0) {
                    setSeconds(() => seconds - 1);
                } else if (minutes === 0 && seconds === 0) {
                    clearInterval(tikTok);
                    setMinutes(0);
                    setSeconds(0);
                    setIsTimerOn(false);
                    audioEl.play();
                    alert('COFFEE IS READY!!!')
                }
            }, 1000);
        } else if (!isTimerOn && (minutes > 0 || seconds > 0)) {
            clearInterval(tikTok);
        }

        return () => clearInterval(tikTok);
    }, [isTimerOn, seconds, minutes])

    return (
        <>
            {isTimerOn?
            <h3 id="h3">
                YOUR TIME IS RUNNING!
            </h3>
            :
            <h3 id="h3">
                SET YOUR TIME:
            </h3>}
            <div className="input-div" style={isTimerOn? {display: "none"} : {display: "block"}}>
                <input type="number" min="0" max="59" value={minutes} onChange={e => {setMinutes(e.target.value)}} className="input"/>
                <label className="input">:</label>
                <input type="number" min="0" max="59" value={seconds} onChange={e => {setSeconds(e.target.value)}} className="input"/>
            </div>
            <div className="countdown">
                {minutes < 10? '0' + minutes : minutes}:{seconds < 10? '0' + seconds : seconds}
            </div>
            <Button btn_function={toggle} btn_label={isTimerOn? 'PAUSE' : 'START'}/>
            <Button btn_function={stop} btn_label='STOP' style={isTimerOn? {display:"block"} : {display:"none"}}/>
            <Button btn_function={addOneMinute} btn_label="+1'"/>
            <audio className="audio-element">
                <source src="https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3"></source>
            </audio>
        </>
    )

}

export default Timer;


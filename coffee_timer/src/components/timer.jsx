import React, { useState, useEffect } from 'react';
import Button from './button';
import soundfile from '../assets/school-bell.mp3'

function Timer() {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const audioEl = document.getElementsByClassName("audio-element")[0]

    let time = new Date();

    console.log('is timer on?', isTimerOn, time.toLocaleTimeString());

    function toggle() {
        if (minutes >= 0 && seconds >= 0) {
            setIsTimerOn(!isTimerOn);
        } else {
            alert("Negative numbers not allowed!");
        }
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
    }, [isTimerOn, seconds, minutes, audioEl])

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
            <p className="countdown">
                {minutes < 10? '0' + minutes : minutes}:{seconds < 10? '0' + seconds : seconds}
            </p>
            <Button btn_function={toggle} btn_label={isTimerOn? 'PAUSE' : 'START'}/>
            <Button btn_function={stop} btn_label='STOP' style={isTimerOn? {display:"block"} : {display:"none"}}/>
            <Button btn_function={addOneMinute} btn_label="+1'"/>
            <audio className="audio-element">
                {/* <source src="https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3" samesite='secure'></source> */}
                <source src={soundfile}></source>
            </audio>
        </>
    )

}

export default Timer;


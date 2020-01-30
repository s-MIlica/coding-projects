import React, { useState, useEffect } from 'react';
import Button from './button';
import Alarm from './alarm';
// import Sound from 'react-sound';

function Timer({url}) {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isTimerOn, setIsTimerOn] = useState(false);
    // const [status, setStatus] = useState('STOP')
    const [play, togglePlay] = new Alarm(url)
    console.log('is timer on?', isTimerOn);

    function toggle() {
        setIsTimerOn(!isTimerOn);
    }

    function stop() {
        if (isTimerOn) {
            // setStatus('STOP');
            togglePlay()
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
                    setSeconds(s => seconds - 1);
                } else if (minutes > 0 && seconds === 0 ) {
                    setMinutes(m => minutes - 1);
                    setSeconds(59);
                } else if (minutes > 0 && seconds > 0) {
                    setSeconds(s => seconds - 1);
                } else if (minutes === 0 && seconds === 0) {
                    // setStatus('PLAYING')
                    togglePlay();
                    clearInterval(tikTok);
                    setMinutes(0);
                    setSeconds(0);
                    setIsTimerOn(false);
                }
            }, 1000);
        } else if (!isTimerOn && (minutes > 0 || seconds > 0)) {
            clearInterval(tikTok);
        }

        return () => clearInterval(tikTok);
    }, [isTimerOn, seconds, minutes, togglePlay])

    return (
        <>
            <h3 id="h3">
                SET YOUR TIME:
            </h3>
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
            {/* <Sound url="https://www.youtube.com/watch?v=zUwEIt9ez7M" playStatus={...status}/> */}
            {/* <div className="message-div" style={play? {display: "block"} : {display:"none"}}>
                <h3 id="message-id">to turn off the music press STOP button</h3>
            </div> */}
        </>
    )

}

export default Timer;


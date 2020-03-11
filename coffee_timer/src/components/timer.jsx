import React, { useState, useEffect } from 'react';
import Button from './button';
import soundfile from '../assets/school-bell.mp3'

function Timer() {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const audioFile = document.getElementsByClassName("audio-element")[0]

    // let time = new Date();

    // console.log('is timer on?', isTimerOn, time.toLocaleTimeString());

    function toggle() {
    /*if the timer is on it switches it off,
    if the timer is off it switches it on;
    also makes sure user doesn't input negative numbers */

        if (minutes >= 0 && seconds >= 0) {
            setIsTimerOn(!isTimerOn);
        } else {
            alert("Negative numbers not allowed!");
        }
    }

    function stop() {
    /*if the timer is on:
    rests counter, stops the alarm, and turnes timer off */

        if (isTimerOn) {
            setMinutes(0);
            setSeconds(0);
            audioFile.pause();
            audioFile.currentTime = 0;
            toggle();
        }
    }

    function addOneMinute() {
    /*adds one minute to the counter */

        setMinutes(() => minutes + 1)
    }

    useEffect(() => {
        let tikTok = null;
        
        if (isTimerOn) {
            tikTok = setInterval(() => {
            /*counts down seconds if the timer is on */

                if (seconds < 60 && seconds > 0 && minutes === 0) {
                    setSeconds(() => seconds - 1);
                } else if (minutes > 0 && seconds === 0 ) {
                    setMinutes(() => minutes - 1);
                    setSeconds(59);
                } else if (minutes > 0 && seconds > 0) {
                    setSeconds(() => seconds - 1);
                } else if (minutes === 0 && seconds === 0) {
                    clearInterval(tikTok);
                    audioFile.play();
                    // alert('COFFEE IS READY!!!')
                }
            }, 1000);
        } else if (!isTimerOn && (minutes > 0 || seconds > 0)) {
            /*if the timer is off but there are still some minutes/seconds on the 
            counter, it will pause the setInterval*/
            clearInterval(tikTok);
        }

        return () => clearInterval(tikTok);
    }, [isTimerOn, seconds, minutes, audioFile])

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

            <p className="countdown" style={isTimerOn? {color: 'rgb(238, 203, 247)', textShadow: '0 0 8px rgb(183, 30, 221)', display: 'block'} : {color: 'black', textShadow: 'none', display: 'none'}}>
                {minutes < 10? '0' + minutes : minutes}:{seconds < 10? '0' + seconds : seconds}
            </p>

            <p className="message" style={(isTimerOn && minutes===0 && seconds===0)? {display:"block"} : {display:"none"}}>
                YOUR COFFE IS READY!!!
            </p>

            <Button btn_function={toggle} btn_label={isTimerOn? 'PAUSE' : 'START'}/>
            <Button btn_id="stop-resest" btn_function={stop} btn_label='STOP/RESET' style={isTimerOn? {display:"block"} : {display:"none"}}/>
            <Button btn_function={addOneMinute} btn_label="+1'"/>

            <audio className="audio-element">
                <source src={soundfile}></source>
            </audio>
        </>
    )

}

export default Timer;

/*gitHub: s-Milica */
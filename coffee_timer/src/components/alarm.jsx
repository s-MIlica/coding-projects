import React, { useState } from 'react';
import Sound from 'react-sound';
import soundfile from '../assests/autotune.mp3'

function Alarm() {
    // const [playStatus, setPlayStatus] = useState('STOP')


    return (
        <Sound url={soundfile} 
        playStatus={Sound.status.PLAYING}/>
    )
}

export default Alarm;
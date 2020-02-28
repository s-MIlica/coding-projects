import { useState, useEffect } from 'react';

function Alarm({url}) {
    const [audio, setAudio] = useState(new Audio(url))
    const [play, setPlay] = useState(false);

    function togglePlay() {
        setPlay(!play);
    }

    useEffect(() => {
        play? audio.load() : audio.pause() && audio.currentTime(0)
    }, [play, audio])

    useEffect(() => {
        return () => {audio.addEventListener('ended', setPlay(false))}
    }, [audio])

    return [play, togglePlay];
}

export default Alarm;
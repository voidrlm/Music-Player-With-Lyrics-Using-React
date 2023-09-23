import React, { useState, useRef, useEffect } from "react";
import "./musicPlayer.css";
import "./progressBar.css";
import { IconContext } from "react-icons";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { musicDB } from "../../resources/musicData";
const MusicPlayer = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  const playNext = () => {
    const nextIndex = (currentSongIndex + 1) % musicDB.length;
    setCurrentSongIndex(nextIndex);
    audioRef.current.pause();

    audioRef.current.src = musicDB[nextIndex].src;
    audioRef.current.load();

    audioRef.current.oncanplaythrough = () => {
      audioRef.current.play();
      audioRef.current.oncanplaythrough = null;
      setLoading(false); // Set loading to false when the audio is ready
    };

    setLoading(true); // Set loading to true while the new audio is loading
  };

  const playPrev = () => {
    const prevIndex = (currentSongIndex - 1 + musicDB.length) % musicDB.length;
    setCurrentSongIndex(prevIndex);
    audioRef.current.pause();

    audioRef.current.src = musicDB[prevIndex].src;
    audioRef.current.load();

    audioRef.current.oncanplaythrough = () => {
      audioRef.current.play();
      audioRef.current.oncanplaythrough = null;
      setLoading(false); // Set loading to false when the audio is ready
    };

    setLoading(true); // Set loading to true while the new audio is loading
  };
  //USE EFFECT FOR SENDING CURRENT TIME TO PARENT COMPONENT FOR LYRICS
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Call the callback function in the parent component with the data
      props.getDataForLyrics({
        trackId: musicDB[currentSongIndex].id,
        currentTime: currentTime,
      });
    }, 500); // Update data every 1 second

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [props]);
  //USE EFFECT FOR TRACK SEEKING
  useEffect(() => {
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

    // Add an event listener for the 'ended' event to autoplay the next song
    audioRef.current.addEventListener("ended", playNext);

    return () => {
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
      audioRef.current.removeEventListener("ended", playNext);
    };
  }, [currentSongIndex, playNext, props]);
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSeek = (newTime) => {
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  const progress = (currentTime / duration) * 100 || 0;
  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={musicDB[currentSongIndex].src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      ></audio>
      <div className="component">
        <h2 className="playerTitle">
          {loading && currentSongIndex !== 0
            ? "Loading..."
            : musicDB[currentSongIndex].album}
        </h2>
        <div className="musicCover">
          <img className="albumArtImage" src={musicDB[currentSongIndex].art} />
        </div>
        <div className="progress-container">
          <div
            className="progress"
            onClick={(e) =>
              handleSeek(
                (e.nativeEvent.offsetX / e.target.offsetWidth) * duration
              )
            }
          >
            <div
              className="progress-filled"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="track-info">
          <div className="current-time">{formatTime(currentTime)}</div>
          <div className="duration">{formatTime(duration)}</div>
        </div>
        <div className="musicDetails">
          <h3 className="title">{musicDB[currentSongIndex].title}</h3>
          <p className="subTitle">{musicDB[currentSongIndex].artist}</p>
        </div>
        <div className="musicControls">
          <button className="playButton clickable" onClick={playPrev}>
            <IconContext.Provider value={{ size: "3em", color: "#000000" }}>
              <BiSkipPrevious />
            </IconContext.Provider>
          </button>
          {!isPlaying ? (
            <button className="playButton clickable" onClick={togglePlay}>
              <IconContext.Provider value={{ size: "3em", color: "#000000" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </button>
          ) : (
            <button className="playButton clickable" onClick={togglePlay}>
              <IconContext.Provider value={{ size: "3em", color: "#000000" }}>
                <AiFillPauseCircle />
              </IconContext.Provider>
            </button>
          )}
          <button className="playButton clickable" onClick={playNext}>
            <IconContext.Provider value={{ size: "3em", color: "#000000" }}>
              <BiSkipNext />
            </IconContext.Provider>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;

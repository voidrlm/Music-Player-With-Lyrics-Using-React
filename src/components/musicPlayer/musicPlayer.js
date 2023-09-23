import React, { useState, useRef } from "react";
import "./musicPlayer.css";
import { IconContext } from "react-icons";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { musicDB } from "../../resources/musicData";
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

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

    // Use the canplaythrough event to play after the new audio is ready
    audioRef.current.oncanplaythrough = () => {
      audioRef.current.play();
      audioRef.current.oncanplaythrough = null; // Remove the event listener to prevent multiple plays
    };
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
    };
  };

  return (
    <div className="music-player">
      <audio ref={audioRef} src={musicDB[currentSongIndex].src}></audio>
      <div className="component">
        <h2 className="playerTitle">{musicDB[currentSongIndex].album}</h2>
        <div className="musicCover">
          <img className="albumArtImage" src={musicDB[currentSongIndex].art} />
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

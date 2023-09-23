import React, { useState, useRef } from "react";
import "./musicPlayer.css";
import { IconContext } from "react-icons";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { musicDB } from "../../resources/musicData";
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player">
      <audio ref={audioRef} src={musicDB[0].url}></audio>
      <div className="component">
        <h2 className="playerTitle">{musicDB[0].album}</h2>
        <div className="musicCover">
          <img className="albumArtImage" src={musicDB[0].art} />
        </div>
        <div className="musicDetails">
          <h3 className="title">{musicDB[0].title}</h3>
          <p className="subTitle">{musicDB[0].artist}</p>
        </div>
        <div className="musicControls">
          <button className="playButton">
            <IconContext.Provider value={{ size: "3em", color: "#000000" }}>
              <BiSkipPrevious />
            </IconContext.Provider>
          </button>
          {!isPlaying ? (
            <button className="playButton" onClick={togglePlay}>
              <IconContext.Provider value={{ size: "3em", color: "#000000" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </button>
          ) : (
            <button className="playButton" onClick={togglePlay}>
              <IconContext.Provider value={{ size: "3em", color: "#000000" }}>
                <AiFillPauseCircle />
              </IconContext.Provider>
            </button>
          )}
          <button className="playButton">
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

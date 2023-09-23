import React, { useState } from "react";
import MusicPlayer from "./components/musicPlayer/musicPlayer";
import Lyrics from "./components/lyrics/lyrics";
import "./styles/twoSections.css";

function App() {
  const [dataForLyrics, setDataForLyrics] = useState({});

  // Function to handle data updates from the child component
  const handleLyricsDataFromChild = (data) => {
    setDataForLyrics(data);
  };
  return (
    <div className="App">
      <div className="two-sections-layout">
        <div className="section-left">
          {<MusicPlayer getDataForLyrics={handleLyricsDataFromChild} />}
        </div>
        <div className="section-right">
          <Lyrics
            trackId={dataForLyrics.trackId}
            currentTime={dataForLyrics.currentTime}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

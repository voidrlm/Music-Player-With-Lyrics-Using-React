import React from "react";
import MusicPlayer from "./components/musicPlayer/musicPlayer";
import "./styles/twoSections.css";
function App() {
  return (
    <div className="App">
      <div className="two-sections-layout">
        <div className="section-left">{<MusicPlayer />}</div>
        <div className="section-right">
          {/* Content for the right section */}
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useRef, useState, useCallback } from 'react';
import './App.scss';
import Controls from './components/Controls/Controls';
import PlayList from './components/PlayList/PlayList';
import ProgressArea from './components/ProgressArea/ProgressArea';
import SongDetail from './components/SongDetail/SongDetail';

function App() {
  const audioRef = useRef();
  const [showPlayList, setShowPlayList] = useState(false);
  
  const onPlay = useCallback(() => {
    audioRef.current.play()
  },[])
  const onPause = useCallback(() => {
    audioRef.current.pause()
  },[])
  const changeVolume = useCallback((volume) => {
    audioRef.current.changeVolume(volume)
  },[])
  const resetDuration = useCallback(() => {
    audioRef.current.resetDuration()
  },[])

  return (
    <div className="App">
      <div className="container">
        <div className='card'>
          <SongDetail />
          <ProgressArea ref={audioRef} />
          <Controls 
            setShowPlayList={setShowPlayList}
            play={onPlay} 
            pause={onPause} 
            changeVolume={changeVolume} 
            resetDuration={resetDuration} 
          />
          <PlayList 
            setShowPlayList={setShowPlayList} 
            showPlayList={showPlayList}
          />
  </div>
      </div>
    </div>
  );
}

export default App;

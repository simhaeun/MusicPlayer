import React, { memo } from 'react';
import './SongDetail.scss';
import { useSelector } from 'react-redux';

function SongDetail() {
    const playing = useSelector((state) => state.playing);
    const playList = useSelector((state) => state.playList);
    const currentIndex = useSelector((state) => state.currentIndex);
    
    return (
        <>
            <div className="header">
                <span style={{fontWeight: 'bold', fontSize: '20px'}}>{playing ? 'Now Playing' : 'Not Playing'}</span>
            </div>
            <div className="img-area">
                <img 
                    src={playList[currentIndex].img}
                    alt={playList[currentIndex].name}
                />
            </div>
            <div className="music-info">
                <p className="song"
                    style={{fontWeight: 'bold', fontSize: '20px'}}
                >{playList[currentIndex].name}</p>
                <p className="artist"
                    style={{fontSize: '16px'}}
                >{playList[currentIndex].artist}</p>
            </div>
        </>
    );

}

export default memo(SongDetail);
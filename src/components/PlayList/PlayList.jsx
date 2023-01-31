import React, { memo, useCallback } from 'react';
import QueueMusic from '@mui/icons-material/QueueMusic';
import Close from '@mui/icons-material/Close';
import PlayListItem from './PlayListItem';
import classNames from 'classnames';
import './PlayList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentIndex, updatePlaayList } from '../../store/musicPlayerRaducer';
import SortableList from "@billy-fe/sortable-list";

const PlayList = ({ showPlayList, setShowPlayList }) => {
    const playList = useSelector(state => state.playList);
    const dispatch = useDispatch();

    const onClickClosePlayList = useCallback(() => {
        setShowPlayList(false)
    },[setShowPlayList]);

    const onClickItem = useCallback((index) => {
        dispatch(setCurrentIndex(index))
    },[dispatch]);

    const onDropItem = useCallback((newPlayList) => {
        dispatch(updatePlaayList(newPlayList))
    },[dispatch]);

    const renderItem = useCallback(
        (item, index) => <PlayListItem item={item} index={index} />, 
        []
    );

    return (
        <div className={classNames('play-list', { show: showPlayList })}>
            <div className="header">
                <div className="row">
                    <QueueMusic className='list' />
                    <span>Play list</span>
                </div>
                <Close 
                    onClick={onClickClosePlayList} 
                    sx={{ fontSize: 22, cursor: 'pointer' }} 
                />
            </div>
            <SortableList
                data={playList}
                onDropItem={onDropItem}
                onClickItem={onClickItem}
                renderItem={renderItem}
            />
        </div>
    );
}

export default memo(PlayList);
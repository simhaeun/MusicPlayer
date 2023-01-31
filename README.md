# React App MusicPlayer
[![Netlify Status](https://api.netlify.com/api/v1/badges/66598ebc-389d-464f-869a-14ce8a811e2e/deploy-status)](https://app.netlify.com/sites/hacookie-mp3/deploys)

## Redux
state를 관리하는 전용 장소(store)에서 상태 관리

## 재생 / 정지 기능
- Reducer 구성
```jsx
const PLAY_MUSIC = 'musicPlayer/PLAY_MUSIC';
const STOP_MUSIC = 'musicPlayer/STOP_MUSIC';

export const playMusic = () => ({type: PLAY_MUSIC})
export const stopMusic = () => ({type: STOP_MUSIC})

export default function musicPlayerReducer(**state = initialState, action**) {
  switch(action.type) {
    case PLAY_MUSIC:
      return {
        ...state,
        playing: true
      }
    case STOP_MUSIC:
      return {
        ...state,
        playing: false
      }
    default:
      return state
  }
}
```
- audioRef 생성
- dispatch로 play/stop Event 받아오기
- useSelector로 동적으로 플레이(PLAY/STOP) 상태 바꾸기

<br>

## Progress bar
- 노래의 시간 구하기
- Progress bar 원하는 지점에서 Play

<br>

## volume
```jsx
const Controls = ({changeVolume,}) => {
  const onChangeVolume = (event) => {
    changeVolume(event.target.value)
  }
  
  return (
    <div className="volume-container">
      <VolumeUpIcon sx={{ fontSize: 20 }} />
      <input 
        type='range'
	style={{ cursor: 'pointer'}}
	defaultValue={1}
	onChange={onChangeVolume}
	min='0'
	max='1'
	step='0.1'
      />
    </div>
  );
}
```

<br>

## 이전 곡 / 다음 곡
- store에 NEXT, PREV action 추가
- `shallowEqual`을 이용한 useSelector 최적화
- 노래에 따라 이미지, 아티스트, 제목 구현하기
- 노래가 끝나면 자동으로 다음 곡으로 넘어가기
```jsx
const onEnded = () => {
  dispatch(nextMusic())
}

return (
  <audio 
    autoPlay
    onEnded={onEnded}
    onPlay={onPlay}
    onPause={onPause}
    onTimeUpdate={onTimeUpdate}
    src={playList[currentIndex].src}
    ref={audio}
></audio>
```
<br>

## Play Mode
- 전체 반복(기본), 랜덤 플레이, 한 곡 반복,
- 모드에 따라 아이콘 바꾸기 
- 랜덤 재생 기능 구현하기
- 한 곡 반복 구현하기
```jsx
function ProgressArea(props, ref) {
  useImperativeHandle(ref, () => ({
    play: () => {
      audio.current.play()
    },
    pause: () => {
      audio.current.pause()
    },
    changeVolume:(volume) => {
      audio.current.volume = volume
    }
    resetDuration: () => {
      audio.current.currentTime = 0;
    }
}))
```
<br>

## play list 재생시간 구하기
- 노래의 재생시간 구하기 
```jsx
const getDuration = (src) => {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.onloadedmetadata = () => {
      const minutes = `0${parseInt(audio.duration / 60, 10)}`
      const seconds = `0${parseInt(audio.duration % 60)}`
      resolve(`${minutes}:${seconds.slice(-2)}`)
    }
    audio.src = src
  })
}

function PlayListItem({ item, index }) {
  const [duration, setduration] = useState("00:00");

  useEffect(()=>{
    async function getTime(){
      const durationTime = await getDuration(item.src)
      setduration(durationTime)
    }
    getTime()
  },[item.src]);
};
```
- useCallback, memo로 감싸주며 마무리

# React App MusicPlayer
[![Netlify Status](https://api.netlify.com/api/v1/badges/66598ebc-389d-464f-869a-14ce8a811e2e/deploy-status)](https://app.netlify.com/sites/hacookie-mp3/deploys)

## Redux
state를 관리하는 전용 장소(store)에서 상태 관리

## 재생 / 정지 기능
- Reducer 구성하기
- audioRef 생성
- dispatch로 play/stop Event 받아오기

<br>

## Progress bar
- 노래의 시간 구하기
- 원하는 지점에서 Play

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
- 버튼에 이벤트 추가
- `shallowEqual`을 이용한 useSelector 최적화
- 노래가 끝나면 자동으로 다음 곡으로 넘어가기

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

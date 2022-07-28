import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe, { muted: true, autoplay: true });

onFinishedTime();

player.on('timeupdate', throttle(onSaveTime, 1000));
player.on('ended', onClearStorage);

function onClearStorage() {
  localStorage.removeItem(CURRENT_TIME);
}

function onSaveTime(evt) {
  const saveTime = evt.seconds;
  localStorage.setItem(CURRENT_TIME, saveTime);
}

function onFinishedTime() {
  if (localStorage.getItem(CURRENT_TIME)) {
    player.setCurrentTime(localStorage.getItem(CURRENT_TIME));
  }
}

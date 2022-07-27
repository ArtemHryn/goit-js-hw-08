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

function onSaveTime() {
  player
    .getCurrentTime()
    .then(function (seconds) {
      localStorage.setItem(CURRENT_TIME, seconds);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function onFinishedTime() {
  player
    .setCurrentTime(localStorage.getItem(CURRENT_TIME))
      .then(function (seconds) {
        console.log("The video started on", seconds);
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          console.log('Some Error here');
          break;

        default:
          console.log('Some Error');
          break;
      }
    });
}

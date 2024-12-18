import { CLIENT_VERSION } from './Constants.js';
import { initStage, setStage } from './GameData.js';

const socket = io('http://localhost:3000', {
  query: {
    clientVersion: CLIENT_VERSION,
  },
});

let userId = null;
socket.on('response', (data) => {
  console.log('socket',data);
  if (data.id === 'initGame') {
    const { stage } = data;
    initStage(stage);
  }
  if (data.id === 'moveStage') {
    const { stage } = data;
    setStage(stage);
  }
});

socket.on('connection', (data) => {
  console.log('connection: ', data);
  userId = data.uuid;
});

const sendEvent = (handlerId, payload) => {
  socket.emit('event', {
    userId,
    clientVersion: CLIENT_VERSION,
    handlerId,
    payload,
  });
};

export { sendEvent };

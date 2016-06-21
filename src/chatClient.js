import io from 'socket.io-client';
import state from './state';
import { receiveMessage, connect, disconnect } from './actions/chat';

const debug = require('debug')('app:chatClient');

const CHAT_HOST = process.env.CHAT_HOST;

export default new class ChatClient {

  constructor() {
    this.cursor = state.select('chat');

    debug('connecting chat to ', CHAT_HOST);
    this.socket = io.connect(CHAT_HOST);

    this.socket.on('connect', () => {
      this._dispatchAction(connect);
    });

    this.socket.on('disconnect', () => {
      this._dispatchAction(disconnect);
    });

    this.socket.on('message', (message) => {
      debug('received message', message);
      this._dispatchAction(receiveMessage, message);
    });
  }

  sendMessage(text) {
    const user = this.cursor.get(['username']);

    const message = {
      message: text,
      user,
    };

    this.socket.emit('message', message);
  }

  _dispatchAction(action, ...args) {
    action.call(this, state, ...args);
  }
};

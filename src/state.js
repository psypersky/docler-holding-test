import Baobab from 'baobab';

const photosDefaultWidth = document.documentElement.clientWidth < 400 ? document.documentElement.clientWidth - 50 : 400;

export default new Baobab({

  // View Router
  view: null,
  projectId: null,
  projectData: null,

  // Chat
  chat: {
    username: '',
    connected: false,
    messages: [],
  },

  photos: {
    size: {
      width: photosDefaultWidth,
      height: 200,
    }
  }
});

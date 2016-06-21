import Router from 'baobab-router';
import tree from './state';

export default new Router(tree, {
  defaultRoute: '/chat',
  routes: [
    {
      path: '/chat',
      state: {
        view: 'chat',
        projectId: null,
      },
    },
    {
      path: '/photos',
      state: {
        view: 'photos',
        projectId: null,
      },
    },
    {
      path: '/settings',
      state: {
        view: 'settings',
        projectId: null,
      },
    },
  ],
});


export default function changeChatUsername(state, username) {
  state.set(['chat', 'username'], username);
  state.commit();
}
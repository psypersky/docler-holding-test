
export default function connect(state) {
  state.set(['chat', 'connected'], true);
  state.set(['chat', 'username'], `user-${Math.ceil(Math.random() * 1000)}`);
  state.commit();
}

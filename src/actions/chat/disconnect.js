
export default function disconnect(state) {
  state.set(['chat', 'connected'], false);
  state.commit();
}

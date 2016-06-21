
export default function changeView(state, page) {
  state.set(['view'], page);
  state.commit();
}

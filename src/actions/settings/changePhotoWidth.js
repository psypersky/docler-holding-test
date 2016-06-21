
export default function changePhotoWidth(state, width) {
  state.set(['photos', 'size', 'width'], width);
  state.commit();
}
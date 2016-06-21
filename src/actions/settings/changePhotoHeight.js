
export default function changePhotoHeight(state, height) {
  state.set(['photos', 'size', 'height'], height);
  state.commit();
}
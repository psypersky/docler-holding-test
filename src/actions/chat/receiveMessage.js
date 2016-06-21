
export default function receiveMessage(state, message) {

  // Ignore own messages
  const username = state.get(['chat', 'username']);
  const ownMessage = ~message.message.indexOf(username);
  if (ownMessage) {
    return;
  }

  ownMessage && (message.ownMessage = !!ownMessage);
  state.select(['chat', 'messages']).push(message);
  state.commit();
}

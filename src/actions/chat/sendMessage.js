import chatClient from '../../chatClient';

export default function sendMessage(state, text) {
  chatClient.sendMessage(text);

  // Given that the only response is the bot's one we save the message without knowing if the sent was sucessfull
  const username = state.get(['chat', 'username'])
  const message = { user: username, message: text, ownMessage: true };
  state.select(['chat', 'messages']).push(message);
}

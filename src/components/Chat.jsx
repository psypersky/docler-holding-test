import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import classNames from 'classnames';
import { branch } from 'baobab-react/higher-order';
import { sendMessage as sendChatMessage } from '../actions/chat';

const SCROLL_OFFSET = 120;

@branch({
  chat: ['chat'],
})

export default class Chat extends React.Component {

  static propTypes = {
    chat: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      inputText: '',
    };

    this.handleInputChange = ::this.handleInputChange;
    this.handleSendClick = ::this.handleSendClick;
    this.handleInputKeyPress = ::this.handleInputKeyPress;
  }

  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this.refs.messagesContainer);
    const scrollBottom = node.scrollHeight - node.offsetHeight - node.scrollTop;

    if (scrollBottom < SCROLL_OFFSET) {
      node.scrollTop = node.scrollHeight;
    }
  }

  handleInputChange(event) {
    this.setState({ inputText: event.target.value });
  }

  handleSendClick() {
    if (this.state.inputText.length < 2) {
      return;
    }

    this.props.dispatch(sendChatMessage, this.state.inputText);

    this.setState({ inputText: '' });
  }

  handleInputKeyPress(event) {
    if (event.charCode === 13) {
      this.handleSendClick();
    }
  }

  render() {
    const {inputText} = this.state;

    return (
      <div className='chat'>
        <div className="messages-container" ref='messagesContainer'>
          <ul>
            {
              this.props.chat.messages.map(({ user, message, ownMessage }, index) =>
                <li
                  className={ classNames('message', {
                    'own-message': ownMessage
                  })}
                  key={`msg-${index}`}
                >
                  <Paper
                    className="msg-bubble"
                    zDepth={1}
                  >
                    { ownMessage
                      ? <span><span className="text">{message}</span></span>
                      : <span><span className="username">{user}</span><span className="text">{message}</span></span>
                    }
                 </Paper>
                </li>
              )
            }
          </ul>
        </div>
        <div className="controls">
          <TextField
            hintText="Say hello!"
            className="text"
            value={inputText}
            onChange={this.handleInputChange}
            onKeyPress={this.handleInputKeyPress}
          />
          <RaisedButton
            label="Send"
            className="send"
            onClick={this.handleSendClick}
          />
        </div>
      </div>
    );
  }
}

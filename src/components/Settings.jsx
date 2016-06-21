import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import _ from 'lodash';
import {changePhotoWidth, changePhotoHeight, changeChatUsername} from '../actions/settings';

@branch({
  photos: ['photos'],
  chat: ['chat']
})

export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.handleWidthSliderChange = _.throttle(::this.handleWidthSliderChange, 100);
    this.handleHeightSliderChange = _.throttle(::this.handleHeightSliderChange, 100);
    this.handleUsernameChange = ::this.handleUsernameChange;
  }

  handleWidthSliderChange(event, value) {
    this.props.dispatch(changePhotoWidth, value);
  }

  handleHeightSliderChange(event, value) {
    this.props.dispatch(changePhotoHeight, value);
  }

  handleUsernameChange(event) {
    this.props.dispatch(changeChatUsername, event.target.value);
  }

  render() {
    const { width, height } = this.props.photos.size;
    const { username } = this.props.chat;

    return (
      <div className="settings">
        <Card className="card-photo">
          <CardHeader
            title="Photo Settings"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText className="card-body" expandable={true}>
            <p>{`Width: ${width}px`}</p>
            <Slider
              min={100}
              max={800}
              step={1}
              value={width}
              onChange={this.handleWidthSliderChange}
            />
            <p>{`Height: ${height}px`}</p>
            <Slider
              min={100}
              max={800}
              step={1}
              value={height}
              onChange={this.handleHeightSliderChange}
            />
          </CardText>
        </Card>
        <Card className="card-chat">
          <CardHeader
            title="Chat Settings"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText className="card-body" expandable={true}>
            <TextField
              name="username"
              value={username}
              onChange={this.handleUsernameChange}
            />
          </CardText>
        </Card>
      </div>
    );
  }
}


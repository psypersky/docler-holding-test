import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import { branch } from 'baobab-react/higher-order';
import { changeView } from '../actions';

@branch({
  view: ['view']
})

export default class TopMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = ::this.handleChange;
  }

  handleChange(button) {
    this.props.dispatch(changeView, button);
  }

  render() {
    const styles = {
      appBar: {
        flexWrap: 'wrap',
      }
    };

    return(
      <AppBar
        title="Test"
        showMenuIconButton={false}
        style={styles.appBar}
        className="app-bar"
      >
        <Tabs
          value={this.props.view}
          onChange={this.handleChange}
          style={styles.tabs}
          className="tabs"
        >
          <Tab
            label="Chat"
            value="chat"
          >
          </Tab>
          <Tab
            label="Photos"
            value="photos"
          >
          </Tab>
          <Tab
            label="Settigs"
            value="settings"
          >
          </Tab>
        </Tabs>
      </AppBar>
    );
  }
}

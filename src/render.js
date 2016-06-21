import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import { root } from 'baobab-react/higher-order';
import App from './components/ViewSelector';
import state from './state';
import './router';

// Needed for onTouchTap https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

@root(state)

class Root extends React.Component {
  static propTypes = {
    children: React.PropTypes.object,
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Root>
      <App />
    </Root>
  </MuiThemeProvider>,
  document.getElementById('main-container'));

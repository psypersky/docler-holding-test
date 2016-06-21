import React from 'react';
import { branch } from 'baobab-react/higher-order';
import { Chat, Photos, Settings, TopMenu } from '../components';

@branch({
  view: ['view']
})

export default class ViewSelector extends React.Component {
  render() {
    return (
      <div className='view-selector'>
        <TopMenu />
        <div className="view-container">
        {(() => {
          switch (this.props.view) {
            case 'chat': return <Chat />;
            case 'photos': return <Photos />;
            case 'settings': return <Settings />;
            default: return <Chat />;
          }
        })()}
        </div>
      </div>
    );
  }
};

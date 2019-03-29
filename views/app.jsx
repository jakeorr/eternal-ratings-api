import React, { Component } from 'react';

class App extends Component {
  render() {
    const { groupsWithCounts } = this.props;
    // TODO: testing
    console.log('groups', Object.keys(groupsWithCounts));
    return (
      <box
        top="center"
        left="center"
        width="50%"
        height="50%"
        border={{ type: 'line' }}
        style={{ border: { fg: 'blue' } }}
      >
        Hello world
      </box>
    );
  }
}

export default App;

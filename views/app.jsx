import { map } from 'lodash';
import React, { Component } from 'react';
import { groupColor, groupName } from './../config';
import Group from './group';

class App extends Component {
  render() {
    const { groupsWithCounts } = this.props;
    const groupCount = Object.keys(groupsWithCounts).length;
    const widthPercent = 100 / groupCount;
    let index = 0;

    const groups = map(groupsWithCounts, ({ counts, cards }, key) => (
      <box
        {...{
          key,
          label: groupName[key],
          // eslint-disable-next-line no-plusplus
          left: `${widthPercent * index++}%`,
          top: '0%',
          width: `${widthPercent.toFixed(1)}%`,
          height: '100%',
          border: { type: 'line' },
          style: { border: { fg: groupColor[key] } },
        }}
      >
        <Group {...{ counts, cards }} />
      </box>
    ));

    return <element>{groups}</element>;
  }
}

export default App;

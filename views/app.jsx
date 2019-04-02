import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { influenceGroups as influenceGroupNames } from '../config';
import Group from './group';

const propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      counts: PropTypes.objectOf(PropTypes.number),
      cards: PropTypes.arrayOf(PropTypes.object),
    })
  ).isRequired,
};

const defaultProps = {};

class App extends Component {
  render() {
    const { groups } = this.props;
    const groupCount = groups.length;
    const widthPercent = 100 / groupCount;

    const influenceGroups = groups.filter(({ name }) =>
      influenceGroupNames.includes(name)
    );
    const otherGroups = groups.filter(
      ({ name }) => !influenceGroupNames.includes(name)
    );

    return (
      <box>
        {influenceGroups.map(({ name, counts, cards }, index) => (
          <Group
            {...{
              key: name,
              left: `${widthPercent * index}%`,
              top: '0%',
              width: `${widthPercent.toFixed(2)}%`,
              height: '100%',
              name,
              counts,
              cards,
            }}
          />
        ))}
        {otherGroups.map(({ name, counts, cards }, index) => (
          <Group
            {...{
              key: name,
              left: `${widthPercent * (index + influenceGroups.length)}%`,
              top: '0%',
              width: `${widthPercent.toFixed(1)}%`,
              height: '100%',
              name,
              counts,
              cards,
            }}
          />
        ))}
      </box>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;

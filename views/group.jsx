import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { groupColor, groupName } from '../config';
import CardList from './card_list';
import Summary from './summary';

const propTypes = {
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  counts: PropTypes.objectOf(PropTypes.number),
  cards: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  counts: {},
  cards: [],
  name: '',
};

class Group extends Component {
  render() {
    const { left, top, width, height, counts, cards, name } = this.props;

    return (
      <box {...{ left, top, width, height }}>
        <Summary
          {...{
            label: groupName[name],
            color: groupColor[name],
            height: '25%',
            top: 0,
            counts,
          }}
        />
        <CardList
          {...{
            color: groupColor[name],
            height: '75%',
            top: '25%',
            cards,
          }}
        />
      </box>
    );
  }
}

Group.propTypes = propTypes;
Group.defaultProps = defaultProps;

export default Group;

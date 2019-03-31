import React, { Component } from 'react';
import { groupColor, groupName } from '../config';
import CardList from './card_list';
import Summary from './summary';

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

export default Group;

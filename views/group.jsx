import React, { Component } from 'react';
import CardList from './card_list';
import Summary from './summary';

class Group extends Component {
  render() {
    const { counts, cards } = this.props;

    return (
      <element {...{ top: 0, left: 0, width: '100%', height: '100%' }}>
        <Summary {...{ counts }} />
        <CardList {...{ cards }} />
      </element>
    );
  }
}

export default Group;

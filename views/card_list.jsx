import { reverse, sortBy } from 'lodash';
import React, { Component } from 'react';

class CardList extends Component {
  render() {
    const { height, top, cards, color } = this.props;

    /*
    { setNumber: 3,
      eternalId: 2,
      name: 'Helpful Doorbot',
      cardText: '',
      cost: 0,
      influence: '{F}',
      attack: 0,
      health: 3,
      rarity: 'Common',
      type: 'Unit',
      unitType: [ 'Grenadin' ],
      imageUrl: 'https://cards.eternalwarcry.com/cards/full/Helpful_Doorbot.png',
      detailsUrl: 'https://eternalwarcry.com/cards/details/3-2/helpful-doorbot',
      deckBuildable: true,
      count: 1,
      rating: '0.5' }
    */

    const content = reverse(sortBy(cards, 'rating')).reduce(
      (acc, { count, name, rating }) =>
        `${acc}${count} ${name} {${color}-fg}${rating.toFixed(
          1
        )}{/${color}-fg}\n`,
      ''
    );

    // TODO: influence types (cost + gain)
    // maybe "*" gain

    // TODO: add pagination

    return (
      <box
        {...{
          top,
          left: 0,
          width: '100%',
          height,
          tags: true,
          content,
          border: { type: 'line' },
          style: { border: { fg: color } },
        }}
      />
    );
  }
}

export default CardList;

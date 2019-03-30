import { sortBy } from 'lodash';
import React, { Component } from 'react';

class CardList extends Component {
  render() {
    const { cards } = this.props;

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

    const headerRow = ['Name', 'Rating'];

    const rows = sortBy(cards, 'score').map(({ name, rating }) => [
      name,
      rating,
    ]);

    return (
      <table
        {...{
          top: '40%',
          left: 0,
          width: '100%',
          height: '60%',
          data: [headerRow, ...rows],
        }}
      />
    );
  }
}

export default CardList;

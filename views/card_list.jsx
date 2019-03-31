import { reverse, sortBy } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { cardsPerPage } from '../config';
import Pagination from './pagination';

const propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  cards: PropTypes.arrayOf(PropTypes.object),
  color: PropTypes.string,
};

const defaultProps = {
  height: '100%',
  top: 0,
  cards: [],
  color: null,
};

class CardList extends Component {
  constructor(props) {
    super(props);

    this.state = { page: 1 };

    this.onPreviousClick = this.onPreviousClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
  }

  onPreviousClick() {
    const {
      state: { page },
    } = this;
    this.setState({ page: page - 1 });
  }

  onNextClick() {
    const {
      state: { page },
    } = this;
    this.setState({ page: page + 1 });
  }

  render() {
    const {
      onNextClick,
      onPreviousClick,
      props: { height, top, cards, color },
      state: { page },
    } = this;

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

    const start = cardsPerPage * (page - 1);
    const end = cardsPerPage * page;
    const sortedCards = reverse(sortBy(cards, 'rating'));
    const pageCards = sortedCards.slice(start, end);

    const shouldPaginate = cards.length !== pageCards.length;

    const content = pageCards.reduce(
      (acc, { count, name, rating }) =>
        `${acc}${count} ${name} {${color}-fg}${rating.toFixed(
          1
        )}{/${color}-fg}\n`,
      ''
    );

    // TODO: influence types (cost + gain)
    // maybe "*" gain

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
      >
        {shouldPaginate && (
          <Pagination
            {...{
              offset: page - 1,
              limit: cardsPerPage,
              count: cards.length,
              onNextClick,
              onPreviousClick,
            }}
          />
        )}
      </box>
    );
  }
}

CardList.propTypes = propTypes;
CardList.defaultProps = defaultProps;

export default CardList;

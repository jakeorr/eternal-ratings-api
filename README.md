# eternal-ratings-api

A node.js app to rate Eternal cards. Built to be used as an api for other projects. Provides terminal rendering

This is an initial attempt to get something working that I can use. It's mainly aimed at sorting and rating sealed/draft card lists. It uses ratings spreadsheets I've found online, and the excellent resources from [Eternal Warcry](https://eternalwarcry.com/cards/download).

![example](https://raw.githubusercontent.com/jakeorr/eternal-ratings/master/img/example.png)

## Installation

- Install node.js: https://nodejs.org/en/download/
- Install Yarn: https://yarnpkg.com/lang/en/docs/install
- Clone or download this repository
- `cd eternal-ratings && yarn`

## API

See [render.js](render.js) for an example.

`rateCards` will return rated cards including details from the Eternal Warcry API.

`ratedCards` returns all cards with ratings.

`groupCards` returns a grouped set of rated cards. Used as prep for rendering by the terminal renderer.

`parseCardExport` parses name and count from a line of Eternal export.

"1 Helpful Doorbot (Set3 #2)" becomes

```json
{ "name": "Helpful Doorbot", "count": 1 }
```

## Terminal Usage

- Paste an exported Eternal card list into the file with the really obvious name (`PASTE_CARDS_HERE.txt`).
- `yarn start` to render grouped output to terminal.

## Data Fetch

This project stores a list of all cards with ratings (where available) in rated_cards.json. The file can be updated (for new cards/ratings) with `yarn fetch`.

## :sparkles: Future Improvements :sparkles:

- Better fixing card detection (it's [pretty simple](https://github.com/jakeorr/eternal-ratings/blob/69e5186a47383d5d1f9cbde56f9192a48697c020/utils/card_groups.js#L19-L37) right now :sleepy:)

- Display influence types for multifaction, and fixing cards (cost as well as what they generate)

- A web app! (import card list, output to browser, more features)

## Contributions

Contributions are welcome. Linting and formating using the configured tools (eslint, prettier) is appreciated!

## Sources

This tool wouldn't be possible without the following resources:

Eternal card details are pulled from https://eternalwarcry.com/cards/download.

Card ratings are pulled from an aggregated Google Sheets document that I put together from these three sheets:

- https://docs.google.com/spreadsheets/d/1ZDeA_R1sYS_HVaoHNr3ZDqWEbitkCrQ9fyIuIbmIw1c/edit?usp=sharing
- https://docs.google.com/spreadsheets/d/1aU8aNh6u-75fv22_s4LGijCNHMIKlA3d_l-AiUn8GLI/edit#gid=623894863
- https://docs.google.com/spreadsheets/d/1NH1i_nfPKhXO53uKYgJYICrTx_XSqDC88b2I3e0vsc0/edit#gid=2049655513

Thanks to the Dire Wolf Digital and the great Eternal community for making these resources available!

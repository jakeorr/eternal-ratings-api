# eternal-ratings

A node.js app to rate a set of Eternal cards, and render grouped output to the terminal.

This is an initial attempt to get something working that I can use. It's mainly aimed at sorting and rating sealed/draft card lists. It uses ratings spreadsheets I've found online, and the excellent resources from [Eternal Warcry](https://eternalwarcry.com/cards/download). More features and support to come!

![example](https://raw.githubusercontent.com/jakeorr/eternal-ratings/master/img/example.png)

## Installation

- Install node.js: https://nodejs.org/en/download/
- Install Yarn: https://yarnpkg.com/lang/en/docs/install
- Clone or download this repository
- `cd eternal-ratings && yarn`

## Usage

- Paste an exported Eternal card list into the file with the really obvious name (`PASTE_CARDS_HERE.txt`).
- `yarn start`

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

const group = {
  FIRE: 'F',
  TIME: 'T',
  JUSTICE: 'J',
  PRIMAL: 'P',
  SHADOW: 'S',
  NONE: '',
  MULTI: 'multi',
  FIXING: 'fixing',
};

module.exports = {
  eternalCardsUrl: 'https://eternalwarcry.com/content/cards/eternal-cards.json',
  draftsSpreadsheetId: '1DSR5rJofwNla3fSe1N-X3l5CQJQzId_vRkLlqy26II4',
  ratingsSpreadsheetId: '1TX18Qx7FQDah5oAbZpzuThATgGqIYAc8FvflDR6UqRg',

  group,
  groupName: {
    [group.FIRE]: 'Fire',
    [group.TIME]: 'Time',
    [group.JUSTICE]: 'Justice',
    [group.PRIMAL]: 'Primal',
    [group.SHADOW]: 'Shadow',
    [group.NONE]: 'Faction none',
    [group.MULTI]: 'Multifaction',
    [group.FIXING]: 'Fixing and Power',
  },
  groupColor: {
    [group.FIRE]: 'red',
    [group.TIME]: 'yellow',
    [group.JUSTICE]: 'green',
    [group.PRIMAL]: 'blue',
    [group.SHADOW]: 'magenta',
    [group.NONE]: 'grey',
    [group.MULTI]: 'white',
    [group.FIXING]: 'cyan',
  },

  influenceGroups: [
    group.FIRE,
    group.TIME,
    group.JUSTICE,
    group.PRIMAL,
    group.SHADOW,
    group.NONE,
    group.MULTI,
  ],
};

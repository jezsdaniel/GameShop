import {AppCurrency} from './currency';
import {ItemProps} from './item-props';

export const items: ItemProps[] = [
  {
    id: 1,
    name: 'Hero Sword',
    cost: 100,
    image: require('../assets/images/sword.png'),
    currency: AppCurrency.Credits,
  },
  {
    id: 2,
    name: 'Double Sword',
    cost: 10,
    image: require('../assets/images/swords.png'),
    currency: AppCurrency.Premium,
  },
  {
    id: 3,
    name: 'Shield of the King',
    cost: 300,
    image: require('../assets/images/shield.png'),
    currency: AppCurrency.Credits,
  },
  {
    id: 4,
    name: 'Spartan Helmet',
    cost: 50,
    image: require('../assets/images/spartan.png'),
    currency: AppCurrency.Premium,
  },
  {
    id: 5,
    name: 'Armor of the Gods',
    cost: 500,
    image: require('../assets/images/armor.png'),
    currency: AppCurrency.Credits,
  },
  {
    id: 6,
    name: 'Spear of the Legion',
    cost: 1000,
    image: require('../assets/images/spear.png'),
    currency: AppCurrency.Premium,
  },
  {
    id: 7,
    name: 'Map of the World',
    cost: 160,
    image: require('../assets/images/treasure-map.png'),
    currency: AppCurrency.Credits,
  },
  {
    id: 8,
    name: 'Extra Life',
    cost: 20,
    image: require('../assets/images/heart.png'),
    currency: AppCurrency.Premium,
  },
];

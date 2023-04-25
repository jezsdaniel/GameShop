import {ImageSourcePropType} from 'react-native';

import {AppCurrency} from './currency';

export interface ItemProps {
  id: number;
  name: string;
  cost: number;
  image: ImageSourcePropType;
  currency: AppCurrency;
}

import React from 'react';
import {View, FlatList} from 'react-native';

import {Item, ItemProps} from './item';

interface ItemListProps {
  items: ItemProps[];
  onItemSelected: (item: ItemProps) => void;
}

export const ItemList: React.FC<ItemListProps> = ({items, onItemSelected}) => {
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <Item {...item} onPress={() => onItemSelected(item)} />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

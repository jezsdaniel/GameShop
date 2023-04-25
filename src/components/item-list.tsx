import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {Item, ItemProps} from './item';

interface ItemListProps {
  items: ItemProps[];
  onItemSelected: (item: ItemProps) => void;
}

export const ItemList: React.FC<ItemListProps> = ({items, onItemSelected}) => {
  return (
    <FlatList
      data={items}
      renderItem={({item}) => (
        <Item {...item} onPress={() => onItemSelected(item)} />
      )}
      keyExtractor={item => item.id.toString()}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {},
});

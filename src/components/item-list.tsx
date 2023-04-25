import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {ItemProps} from '../data';
import {items} from '../data/sample-data';
import {Item} from './item';

interface ItemListProps {
  onItemSelected: (item: ItemProps) => void;
}

export const ItemList: React.FC<ItemListProps> = ({onItemSelected}) => {
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

import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export interface ItemProps {
  id: number;
  name: string;
  cost: number;
  currency: string;
  purchased: boolean;
}

interface ItemComponentProps extends ItemProps {
  onPress: () => void;
}

export const Item: React.FC<ItemComponentProps> = ({
  name,
  cost,
  currency,
  purchased,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, purchased ? styles.purchased : {}]}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>
        {cost} {currency}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
  },
  purchased: {
    backgroundColor: '#d0f0c0',
  },
  text: {
    fontSize: 16,
  },
});

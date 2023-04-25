import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {appColors} from '../theme';

interface TopBarProps {
  credits: number;
  premiumCurrency: number;
}

export const TopBar: React.FC<TopBarProps> = ({credits, premiumCurrency}) => {
  return (
    <View style={styles.container}>
      <View style={styles.currencyContainer}>
        <Text style={styles.text}>Credits: {credits}</Text>
        <Image
          source={require('../assets/images/star.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.currencyContainer}>
        <Text style={styles.text}>Premium: {premiumCurrency}</Text>
        <Image
          source={require('../assets/images/diamond.png')}
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
    backgroundColor: appColors.primary,
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: appColors.lightText,
    fontFamily: 'Lato-Bold',
  },
  image: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
});

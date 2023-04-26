import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {AppCurrency, ItemProps} from '../data';
import {useAppSelector} from '../store/hooks';
import {appColors} from '../theme';

interface ItemComponentProps extends ItemProps {
  onPress: () => void;
}

export const Item: React.FC<ItemComponentProps> = ({
  id,
  name,
  cost,
  image,
  currency,
  onPress,
}) => {
  const appState = useAppSelector(state => state.app);

  return (
    <View testID={`item-${id}`} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{name}</Text>
        <View style={styles.currencyContainer}>
          <Text style={styles.text}>{cost}</Text>
          <Image
            source={
              currency === AppCurrency.Premium
                ? require('../assets/images/diamond.png')
                : require('../assets/images/star.png')
            }
            style={styles.currencyImage}
          />
        </View>
      </View>
      {appState.purchasedItems.find(item => item.id === id) ? (
        <View testID={`item-${id}-purchased`} style={styles.purchasedButton}>
          <Text style={styles.buttonPurchasedText}>PURCHASED</Text>
        </View>
      ) : (
        <TouchableOpacity
          testID={`item-${id}-button`}
          onPress={onPress}
          style={styles.button}>
          <LinearGradient
            colors={[appColors.primary, appColors.tertiary]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.linearGradient}>
            <Text style={styles.buttonText}>BUY</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: appColors.background,
  },
  imageContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: appColors.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: appColors.secondaryDark,
  },
  image: {
    width: 40,
    height: 40,
  },
  currencyImage: {
    width: 24,
    height: 24,
    marginLeft: 4,
  },
  textContainer: {
    marginLeft: 16,
    marginRight: 16,
    flex: 1,
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  text: {
    fontSize: 20,
    color: appColors.text,
    fontFamily: 'Lato-Regular',
  },
  button: {
    borderRadius: 20,
    height: 40,
  },
  linearGradient: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Lato-Bold',
    color: appColors.lightText,
  },
  purchasedButton: {
    borderRadius: 20,
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: appColors.primaryDark,
  },
  buttonPurchasedText: {
    fontSize: 14,
    fontFamily: 'Lato-Bold',
    color: appColors.text,
  },
});

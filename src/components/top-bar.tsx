import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

import {useAppSelector} from '../store/hooks';
import {appColors} from '../theme';

export const TopBar: React.FC = () => {
  const appState = useAppSelector(state => state.app);

  const animatedCredits = useSharedValue(appState.credits);
  const animatedPremiumCurrency = useSharedValue(appState.premium);

  useEffect(() => {
    animatedCredits.value = withTiming(appState.credits, {duration: 500});
    animatedPremiumCurrency.value = withTiming(appState.premium, {
      duration: 500,
    });
  }, [
    animatedCredits,
    animatedPremiumCurrency,
    appState.credits,
    appState.premium,
  ]);

  const creditsStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animatedCredits.value,
      [appState.credits * 0.9, appState.credits],
      [0.9, 1],
    );
    const opacity = interpolate(
      animatedCredits.value,
      [appState.credits - 1, appState.credits],
      [0.5, 1],
    );

    return {
      opacity,
      transform: [{scale}],
    };
  });

  const premiumCurrencyStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animatedPremiumCurrency.value,
      [appState.premium * 0.9, appState.premium],
      [0.9, 1],
    );
    const opacity = interpolate(
      animatedPremiumCurrency.value,
      [appState.premium - 1, appState.premium],
      [0.5, 1],
    );

    return {
      opacity,
      transform: [{scale}],
    };
  });

  return (
    <View testID="top-bar" style={styles.container}>
      <View style={styles.currencyContainer}>
        <Animated.Text style={[styles.text, creditsStyle]}>
          Credits: {appState.credits}
        </Animated.Text>
        <Image
          source={require('../assets/images/star.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.currencyContainer}>
        <Animated.Text style={[styles.text, premiumCurrencyStyle]}>
          Premium: {appState.premium}
        </Animated.Text>
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

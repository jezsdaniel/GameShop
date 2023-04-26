import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, StatusBar, View} from 'react-native';

import {ItemList, PurchaseModal, PurchaseOverlay, TopBar} from '../components';
import {AppCurrency, ItemProps} from '../data';
import {purchaseItem} from '../store/app-slice';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {appColors} from '../theme';

export const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector(state => state.app);

  const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState('');

  const handleItemSelected = (item: ItemProps) => {
    setSelectedItem(item);
    setPurchaseModalVisible(true);
  };

  const handlePurchaseConfirm = () => {
    if (!selectedItem) {
      return;
    }

    const newCredits =
      selectedItem.currency === AppCurrency.Credits
        ? appState.credits - selectedItem.cost
        : appState.credits;
    const newPremiumCurrency =
      selectedItem.currency === AppCurrency.Premium
        ? appState.premium - selectedItem.cost
        : appState.premium;

    if (newCredits < 0 || newPremiumCurrency < 0) {
      setOverlayMessage('Not enough currency to purchase this item');
      setOverlayVisible(true);
    } else {
      dispatch(purchaseItem(selectedItem));
      setOverlayMessage('Purchase successful!');
      setOverlayVisible(true);
    }

    setPurchaseModalVisible(false);
  };

  return (
    <>
      <SafeAreaView style={styles.topSafeArea} />
      <SafeAreaView style={styles.container}>
        <View style={styles.statusBar}>
          <StatusBar
            backgroundColor={appColors.primary}
            barStyle="light-content"
          />
        </View>
        <TopBar />
        <ItemList onItemSelected={handleItemSelected} />
        <PurchaseModal
          visible={purchaseModalVisible}
          item={selectedItem?.name || ''}
          cost={selectedItem?.cost || 0}
          currency={selectedItem?.currency || ''}
          onConfirm={handlePurchaseConfirm}
          onCancel={() => setPurchaseModalVisible(false)}
        />
        <PurchaseOverlay
          visible={overlayVisible}
          message={overlayMessage}
          onDismiss={() => setOverlayVisible(false)}
        />
      </SafeAreaView>
    </>
  );
};

const BAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: appColors.primary,
    height: BAR_HEIGHT,
  },
  topSafeArea: {
    flex: 0,
    backgroundColor: appColors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },
});

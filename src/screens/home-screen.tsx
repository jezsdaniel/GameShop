import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';

import {
  ItemList,
  ItemProps,
  PurchaseModal,
  PurchaseOverlay,
  TopBar,
} from '../components';
import {appColors} from '../theme';

export const HomeScreen = () => {
  const [credits, setCredits] = useState(1000);
  const [premiumCurrency, setPremiumCurrency] = useState(50);

  const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState('');

  const [items, setItems] = useState<ItemProps[]>([
    {id: 1, name: 'Item 1', cost: 100, currency: 'Credits', purchased: false},
    {id: 2, name: 'Item 2', cost: 10, currency: 'Premium', purchased: false},
    {id: 3, name: 'Item 3', cost: 300, currency: 'Credits', purchased: false},
  ]);

  const handleItemSelected = (item: ItemProps) => {
    if (item.purchased) {
      setOverlayMessage('This item is already purchased.');
      setOverlayVisible(true);
      return;
    }

    setSelectedItem(item);
    setPurchaseModalVisible(true);
  };

  const handlePurchaseConfirm = () => {
    if (!selectedItem) {
      return;
    }

    const newCredits =
      selectedItem.currency === 'Credits'
        ? credits - selectedItem.cost
        : credits;
    const newPremiumCurrency =
      selectedItem.currency === 'Premium'
        ? premiumCurrency - selectedItem.cost
        : premiumCurrency;

    if (newCredits < 0 || newPremiumCurrency < 0) {
      setOverlayMessage('Not enough credits or premium currency.');
      setOverlayVisible(true);
    } else {
      setCredits(newCredits);
      setPremiumCurrency(newPremiumCurrency);

      // Update the purchased status of the item
      const updatedItems = items.map(item =>
        item.id === selectedItem.id ? {...item, purchased: true} : item,
      );

      setItems([...updatedItems]);

      setOverlayMessage('Purchase successful!');
      setOverlayVisible(true);
    }

    setPurchaseModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={appColors.primary}
        barStyle="light-content"
      />
      <TopBar credits={credits} premiumCurrency={premiumCurrency} />
      <ItemList items={items} onItemSelected={handleItemSelected} />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },
});

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {appColors} from '../theme';

interface PurchaseModalProps {
  visible: boolean;
  item: string;
  cost: number;
  currency: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  visible,
  item,
  cost,
  currency,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>Confirm Purchase</Text>
          <Text style={styles.text}>
            Are you sure you want to buy {item} for {cost} {currency}?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.buttonCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: '80%',
    backgroundColor: appColors.background,
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    color: appColors.primary,
    marginBottom: 16,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: appColors.text,
    fontFamily: 'Lato-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  confirmButton: {
    backgroundColor: appColors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginLeft: 8,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: appColors.primary,
    marginRight: 8,
  },
  buttonText: {
    color: appColors.lightText,
    fontSize: 16,
    fontFamily: 'Lato-Bold',
  },
  buttonCancelText: {
    color: appColors.primary,
    fontSize: 16,
    fontFamily: 'Lato-Bold',
  },
});

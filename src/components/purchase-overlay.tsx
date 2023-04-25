import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {appColors} from '../theme';

interface PurchaseOverlayProps {
  visible: boolean;
  message: string;
  onDismiss: () => void;
}

export const PurchaseOverlay: React.FC<PurchaseOverlayProps> = ({
  visible,
  message,
  onDismiss,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.text}>{message}</Text>
        <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
          <Text style={styles.buttonText}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlay: {
    width: '80%',
    backgroundColor: appColors.background,
    borderRadius: 12,
    padding: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 24,
    color: appColors.primary,
    fontFamily: 'Lato-Bold',
  },
  dismissButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: appColors.primary,
    alignSelf: 'center',
  },
  buttonText: {
    color: appColors.primary,
    fontSize: 16,
    fontFamily: 'Lato-Bold',
  },
});

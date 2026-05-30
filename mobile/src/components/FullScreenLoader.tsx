import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text, Modal } from 'react-native';
import { Palette, Spacing, Typography } from '../constants/theme';

interface FullScreenLoaderProps {
  visible: boolean;
  message?: string;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
  visible,
  message = 'Loading...'
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Palette.primary.main} />
          {message && (
            <Text style={[Typography.body1, styles.message]}>
              {message}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: Spacing.xl,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 150,
  },
  message: {
    marginTop: Spacing.md,
    textAlign: 'center',
  },
});

export default FullScreenLoader;

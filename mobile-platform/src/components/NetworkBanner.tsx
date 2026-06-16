import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { Palette, Spacing, Typography } from '../constants/theme';
import { WifiOff } from 'lucide-react-native';

const NetworkBanner: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const slideAnim = new Animated.Value(-100);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      
      Animated.timing(slideAnim, {
        toValue: state.isConnected ? -100 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => unsubscribe();
  }, []);

  if (isConnected) return null;

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
      <WifiOff color="#FFFFFF" size={16} />
      <Text style={styles.text}>You are currently offline. Some features may not work.</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: Palette.error.main,
    padding: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  text: {
    ...Typography.caption,
    color: '#FFFFFF',
    marginLeft: Spacing.sm,
    fontWeight: '600',
  },
});

export default NetworkBanner;

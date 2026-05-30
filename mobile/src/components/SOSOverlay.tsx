import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Linking } from 'react-native';
import { Palette, Spacing, Typography, Shadow, BorderRadius } from '../constants/theme';
import { Phone, MapPin, X, AlertCircle } from 'lucide-react-native';

interface SOSOverlayProps {
  onClose: () => void;
}

const SOSOverlay: React.FC<SOSOverlayProps> = ({ onClose }) => {
  const [countdown, setCountdown] = useState(5);
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
        // Automatically call emergency services after countdown
        // Linking.openURL('tel:112');
    }
  }, [countdown]);

  const handleCallNow = () => {
    Linking.openURL('tel:112');
  };

  return (
    <View style={styles.overlay}>
      <View style={[styles.container, Shadow.lg]}>
        <View style={styles.header}>
            <AlertCircle color={Palette.error.main} size={48} />
            <Text style={[Typography.h2, { color: Palette.error.main, marginTop: Spacing.md }]}>Emergency SOS</Text>
        </View>

        <View style={styles.countdownBox}>
            <Text style={Typography.body1}>Calling emergency services in</Text>
            <Text style={styles.countdownText}>{countdown}</Text>
        </View>

        <View style={styles.actionRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <X color={Palette.grey[600]} size={20} />
                <Text style={[Typography.body1, { marginLeft: Spacing.xs }]}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.callButton} onPress={handleCallNow}>
                <Phone color="#FFFFFF" size={20} />
                <Text style={styles.callText}>Call Now</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
            <MapPin size={16} color={Palette.grey[500]} />
            <Text style={[Typography.caption, { marginLeft: 4 }]}>Your location: AIIMS Delhi, Ansari Nagar</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
    zIndex: 1000,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    width: '100%',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  countdownBox: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  countdownText: {
    fontSize: 72,
    fontWeight: '800',
    color: Palette.error.main,
  },
  actionRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Palette.grey[100],
    flex: 1,
    marginRight: Spacing.md,
    justifyContent: 'center',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Palette.error.main,
    flex: 1,
    justifyContent: 'center',
  },
  callText: {
    color: '#FFFFFF',
    fontWeight: '700',
    marginLeft: Spacing.xs,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.6,
  },
});

export default SOSOverlay;

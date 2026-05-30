import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Palette, Spacing, BorderRadius, Shadow, Typography } from '../../constants/theme';

interface MedicalCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'flat';
}

const MedicalCard: React.FC<MedicalCardProps> = ({
  title,
  subtitle,
  icon,
  onPress,
  style,
  children,
  variant = 'elevated'
}) => {
  const CardContainer = onPress ? TouchableOpacity : View;

  const cardStyles = [
    styles.card,
    variant === 'elevated' && Shadow.md,
    variant === 'outlined' && styles.outlined,
    variant === 'flat' && styles.flat,
    style
  ];

  return (
    <CardContainer onPress={onPress} style={cardStyles} activeOpacity={0.7}>
      <View style={styles.header}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <View style={styles.titleContainer}>
          <Text style={Typography.h3}>{title}</Text>
          {subtitle && (
            <Text style={[Typography.body2, { marginTop: Spacing.xs }]}>{subtitle}</Text>
          )}
        </View>
      </View>
      {children && <View style={styles.content}>{children}</View>}
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  outlined: {
    borderWidth: 1,
    borderColor: Palette.grey[200],
  },
  flat: {
    backgroundColor: Palette.grey[100],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Palette.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  content: {
    marginTop: Spacing.md,
  },
});

export default MedicalCard;

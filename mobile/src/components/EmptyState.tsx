import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Palette, Spacing, Typography, BorderRadius } from '../constants/theme';
import { Info } from 'lucide-react-native';

interface EmptyStateProps {
  title: string;
  description?: string;
  image?: any;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  image,
  action,
  icon
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        {icon || <Info size={40} color={Palette.primary.main} />}
      </View>
      <Text style={[Typography.h3, { textAlign: 'center' }]}>{title}</Text>
      {description && (
        <Text style={[Typography.body2, styles.description]}>
          {description}
        </Text>
      )}
      {action && <View style={styles.actionContainer}>{action}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minHeight: 300,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Palette.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: Spacing.lg,
  },
  description: {
    textAlign: 'center',
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    color: Palette.grey[500],
  },
  actionContainer: {
    marginTop: Spacing.xl,
    width: '100%',
  },
});


export default EmptyState;

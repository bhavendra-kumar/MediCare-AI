import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Palette, Spacing, BorderRadius, Shadow, Typography } from '../../constants/theme';

interface HealthStatCardProps {
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    type: 'up' | 'down' | 'neutral';
  };
  color?: string;
}

const HealthStatCard: React.FC<HealthStatCardProps> = ({
  label,
  value,
  unit,
  icon,
  trend,
  color = Palette.primary.main
}) => {
  return (
    <View style={[styles.container, Shadow.sm]}>
      <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
        {icon}
      </View>
      <View style={styles.content}>
        <Text style={Typography.caption}>{label}</Text>
        <View style={styles.valueRow}>
          <Text style={[Typography.h2, { color }]}>{value}</Text>
          <Text style={[Typography.caption, { marginLeft: Spacing.xs, marginBottom: 2 }]}>
            {unit}
          </Text>
        </View>
        {trend && (
          <Text style={[
            styles.trend,
            { color: trend.type === 'up' ? Palette.success.main : trend.type === 'down' ? Palette.error.main : Palette.grey[500] }
          ]}>
            {trend.type === 'up' ? '↑' : trend.type === 'down' ? '↓' : '•'} {trend.value}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '45%',
    flex: 1,
    margin: Spacing.xs,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  content: {
    flex: 1,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: Spacing.xs,
  },
  trend: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: Spacing.xs,
  },
});

export default HealthStatCard;

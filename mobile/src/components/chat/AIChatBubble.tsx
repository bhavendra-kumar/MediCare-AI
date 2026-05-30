import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Palette, Spacing, BorderRadius, Typography } from '../../constants/theme';

interface AIChatBubbleProps {
  message: string;
  isAi: boolean;
  timestamp?: string;
  isLoading?: boolean;
}

const AIChatBubble: React.FC<AIChatBubbleProps> = ({
  message,
  isAi,
  timestamp,
  isLoading
}) => {
  return (
    <View style={[
      styles.container,
      isAi ? styles.aiContainer : styles.userContainer
    ]}>
      <View style={[
        styles.bubble,
        isAi ? styles.aiBubble : styles.userBubble
      ]}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <View style={styles.dot} />
            <View style={[styles.dot, { marginHorizontal: 4 }]} />
            <View style={styles.dot} />
          </View>
        ) : (
          <Text style={[
            Typography.body1,
            isAi ? styles.aiText : styles.userText
          ]}>
            {message}
          </Text>
        )}
      </View>
      {timestamp && (
        <Text style={[Typography.caption, styles.timestamp]}>
          {timestamp}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
    maxWidth: '85%',
  },
  aiContainer: {
    alignSelf: 'flex-start',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  bubble: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  aiBubble: {
    backgroundColor: Palette.grey[100],
    borderBottomLeftRadius: BorderRadius.xs,
  },
  userBubble: {
    backgroundColor: Palette.primary.main,
    borderBottomRightRadius: BorderRadius.xs,
  },
  aiText: {
    color: Palette.grey[900],
  },
  userText: {
    color: '#FFFFFF',
  },
  timestamp: {
    marginTop: 4,
    color: Palette.grey[400],
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  loadingContainer: {
    flexDirection: 'row',
    padding: Spacing.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Palette.grey[400],
  },
});

export default AIChatBubble;

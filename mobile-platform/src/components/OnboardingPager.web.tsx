import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { FlatList, View, useWindowDimensions } from 'react-native';

type Props = {
  style?: any;
  initialPage?: number;
  onPageSelected?: (e: any) => void;
  children: React.ReactNode;
};

const OnboardingPager = forwardRef<any, Props>((props, ref) => {
  const { width, height } = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);
  const items = React.Children.toArray(props.children);

  useImperativeHandle(ref, () => ({
    setPage: (page: number) => {
      flatListRef.current?.scrollToIndex({ index: page, animated: true });
    },
  }));

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      const index = viewableItems[0].index;
      if (typeof index === 'number' && props.onPageSelected) {
        props.onPageSelected({ nativeEvent: { position: index } });
      }
    }
  });

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  return (
    <FlatList
      ref={flatListRef}
      data={items}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={{ width, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          {item as React.ReactElement}
        </View>
      )}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
      style={[{ flex: 1 }, props.style]}
      contentContainerStyle={{ flexGrow: 1 }}
      initialScrollIndex={props.initialPage}
      getItemLayout={(_, index) => ({
        length: width,
        offset: width * index,
        index,
      })}
    />
  );
});

export default OnboardingPager;

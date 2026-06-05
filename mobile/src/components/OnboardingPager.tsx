import React, { forwardRef } from 'react';
import PagerView from 'react-native-pager-view';

type Props = {
  style?: any;
  initialPage?: number;
  onPageSelected?: (e: any) => void;
  children: React.ReactNode;
};

const OnboardingPager = forwardRef<PagerView, Props>((props, ref) => {
  return (
    <PagerView
      style={props.style}
      initialPage={props.initialPage}
      onPageSelected={props.onPageSelected}
      ref={ref}
    >
      {props.children}
    </PagerView>
  );
});

export default OnboardingPager;

import NetInfo from "@react-native-community/netinfo";

let isConnected = true;

export const startNetworkListener = () => {
  NetInfo.addEventListener((state) => {
    isConnected = !!state.isConnected;
  });
};

export const getNetworkStatus = () => {
  return isConnected;
};

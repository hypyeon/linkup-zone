import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

const FinlandicaRegular = require('../assets/fonts/Finlandica_400Regular.ttf');
const FinlandicaMedium = require('../assets/fonts/Finlandica_500Medium.ttf');
const FinlandicaSemiBold = require('../assets/fonts/Finlandica_600SemiBold.ttf');
const FinlandicaBold = require('../assets/fonts/Finlandica_700Bold.ttf');
const NotoSansCherokeeSemiBold = require('../assets/fonts/NotoSansCherokee_600SemiBold.ttf');
const NotoSansCherokeeBlack = require('../assets/fonts/NotoSansCherokee_900Black.ttf');

const useCustomFonts = () => {
  const [fontsLoaded, fontError] = useFonts({
    'Finlandica-Regular': FinlandicaRegular,
    'Finlandica-Medium': FinlandicaMedium,
    'Finlandica-SemiBold': FinlandicaSemiBold,
    'Finlandica-Bold': FinlandicaBold,
    'NotoSansCherokee-SemiBold': NotoSansCherokeeSemiBold,
    'NotoSansCherokee-Black': NotoSansCherokeeBlack,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return { fontsLoaded, fontError, onLayoutRootView };
};

export default useCustomFonts;

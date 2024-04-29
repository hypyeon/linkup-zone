import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function useCustomFonts() {
  const [fontsLoaded, fontError] = useFonts({
    'Finlandica-Regular': require('../assets/fonts/Finlandica_400Regular.ttf'),
    'Finlandica-Medium': require('../assets/fonts/Finlandica_500Medium.ttf'),
    'Finlandica-SemiBold': require('../assets/fonts/Finlandica_600SemiBold.ttf'),
    'Finlandica-Bold': require('../assets/fonts/Finlandica_700Bold.ttf'),
    'NotoSansCherokee-SemiBold': require('../assets/fonts/NotoSansCherokee_600SemiBold.ttf'),
    'NotoSansCherokee-Black': require('../assets/fonts/NotoSansCherokee_900Black.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return { fontsLoaded, fontError, onLayoutRootView };
};
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function useCustomFonts() {
  const [fontsLoaded, fontError] = useFonts({
    'Fin-Reg': require('../assets/fonts/Finlandica_400Regular.ttf'),
    'Fin-M': require('../assets/fonts/Finlandica_500Medium.ttf'),
    'Fin-SB': require('../assets/fonts/Finlandica_600SemiBold.ttf'),
    'Fin-Bold': require('../assets/fonts/Finlandica_700Bold.ttf'),
    'NSC-Li': require('../assets/fonts/NotoSansCherokee_300Light.ttf'),
    'NSC-Reg': require('../assets/fonts/NotoSansCherokee_400Regular.ttf'),
    'NSC-SB': require('../assets/fonts/NotoSansCherokee_600SemiBold.ttf'),
    'NSC-Black': require('../assets/fonts/NotoSansCherokee_900Black.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return { fontsLoaded, fontError, onLayoutRootView };
};
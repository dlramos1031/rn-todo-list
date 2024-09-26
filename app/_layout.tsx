// _layout.tsx
import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { MD3LightTheme as DefaultTheme } from "react-native-paper";

// Define a custom theme with baby blue and white
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4fc3f7',      // Baby blue for primary elements
    accent: '#ffffff',       // White for accent elements
    background: '#f0f8ff',   // Light background (AliceBlue)
    surface: '#ffffff',      // White surface color for components
    text: '#000000',         // Black text
    placeholder: '#b0bec5',  // Grey placeholder for text input
    onSurface: '#4fc3f7',    // Baby blue on text and icons for emphasis
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </PaperProvider>
  );
}

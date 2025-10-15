import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import "./globals.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          title: "Log in or sign up",
          presentation: "modal",
          headerTitleAlign: "center",
          headerLeft: ({}) => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="listing/[id]"
        options={{
          headerTitleAlign: "center",
          headerTitle: "Listings",
          headerLeft: ({}) => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(modals)/booking"
        options={{
          title: "Booking",
          presentation: "modal",
          headerTitleAlign: "center",
          headerLeft: ({}) => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}

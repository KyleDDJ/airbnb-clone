import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export function InitialLayout() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/(modals)/login");
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          title: "Log in or sign up",
          presentation: "modal",
          headerTitleAlign: "center",
          animation: "fade_from_bottom",
        }}
      />
      <Stack.Screen
        name="listing/[id]"
        options={{
          headerTitleAlign: "center",
          headerTitle: "Listings",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="(modals)/booking"
        options={{
          title: "Booking",
          presentation: "modal",
          headerTitleAlign: "center",
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}

/*
 * DOCU: LoginScreen component - handles user authentication via email input and SSO options.
 * Last Updated At: January 18 2025
 * @author Kyle
 */

import Colors from "@/constants/Colors";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* Enum: Supported SSO strategies */
enum Strategy {
  Google = "oauth_google",
  Facebook = "oauth_facebook",
  Apple = "oauth_apple",
}

/*
 * DOCU: Main LoginScreen component
 * Handles sign-in via email input and multiple SSO providers.
 * Uses `expo-router` navigation and `Clerk` for authentication.
 * Last Updated At: January 18 2025
 * @author Kyle
 */
const LoginScreen: React.FC = () => {
  useWarmUpBrowser();
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  /*
   * DOCU: Handle single sign-on authentication flow
   * @param strategy - The chosen SSO strategy (Google, Apple, Facebook)
   * Triggers Clerk’s `startSSOFlow` and navigates to the main tabs on success.
   * Last Updated At: January 18 2025
   * @author Kyle
   */
  const onSelectAuth = async (strategy: Strategy) => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: strategy,
      });

      if (setActive && createdSessionId) {
        await setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("SSO error:", error);
    }
  };

  /*
   * DOCU: Render email input and continue button
   * Handles manual login using email.
   * Last Updated At: January 18 2025
   * @author Kyle
   */
  const renderEmailSection = () => (
    <View>
      <TextInput
        autoCapitalize="none"
        placeholder="123@gmail.com"
        placeholderTextColor={Colors.gray300}
        className="h-13 bg-white rounded-lg px-3 border border-gray-300"
      />
      <TouchableOpacity className="bg-primary h-12 rounded-lg items-center justify-center mt-8">
        <Text className="text-center text-white font-semibold text-lg">
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );

  /*
   * DOCU: Render visual separator (horizontal line + OR badge)
   * Provides visual separation between email login and SSO buttons.
   * Last Updated At: January 18 2025
   * @author Kyle
   */
  const renderSeparator = () => (
    <View className="flex-row items-center mt-6">
      <View className="flex-1 h-px bg-gray-300" />
      <View className="mx-3 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
        <Text className="text-gray-500 text-sm">OR</Text>
      </View>
      <View className="flex-1 h-px bg-gray-300" />
    </View>
  );

  /*
   * DOCU: Render all available SSO buttons (Phone, Apple, Google, Facebook)
   * Each button triggers its respective authentication method.
   * Last Updated At: January 18 2025
   * @author Kyle
   */
  const renderSSOButtons = () => (
    <View className="gap-8 mt-8">
      {/* Continue with Phone */}
      <TouchableOpacity className={touchableStyle}>
        <View className="flex-row items-center">
          <Ionicons
            name="call"
            size={30}
            color={Colors.blue}
            className={iconStyle}
          />
          <Text className={textStyle}>Continue with Phone</Text>
        </View>
      </TouchableOpacity>

      {/* Continue with Apple */}
      <TouchableOpacity
        onPress={() => onSelectAuth(Strategy.Apple)}
        className={touchableStyle}
      >
        <View className="flex-row items-center">
          <Ionicons
            name="logo-apple"
            size={30}
            color={Colors.dark}
            className={iconStyle}
          />
          <Text className={textStyle}>Continue with Apple</Text>
        </View>
      </TouchableOpacity>

      {/* Continue with Google */}
      <TouchableOpacity
        onPress={() => onSelectAuth(Strategy.Google)}
        className={touchableStyle}
      >
        <View className="flex-row items-center">
          <Ionicons
            name="logo-google"
            size={30}
            color={Colors.primary}
            className={iconStyle}
          />
          <Text className={textStyle}>Continue with Google</Text>
        </View>
      </TouchableOpacity>

      {/* Continue with Facebook */}
      <TouchableOpacity
        onPress={() => onSelectAuth(Strategy.Facebook)}
        className={touchableStyle}
      >
        <View className="flex-row items-center">
          <Ionicons
            name="logo-facebook"
            size={30}
            color={Colors.blue}
            className={iconStyle}
          />
          <Text className={textStyle}>Continue with Facebook</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  /* Render main layout */
  return (
    <SafeAreaView className={containerStyle}>
      {renderEmailSection()}
      {renderSeparator()}
      {renderSSOButtons()}
    </SafeAreaView>
  );
};

/* Tailwind-based styling constants */
const containerStyle = "flex-1 bg-white p-4";
const touchableStyle =
  "bg-white py-4 px-4 rounded-lg border border-dark flex-row items-center justify-center";
const iconStyle = "absolute left-4";
const textStyle = "font-semibold text-lg text-center flex-1";

export default LoginScreen;

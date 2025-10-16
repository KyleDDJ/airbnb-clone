import Colors from "@/constants/Colors";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

enum Strategy {
  Google = "oauth_google",
  Facebook = "oauth_facebook",
  Apple = "oauth_apple",
}

const LoginScreen: React.FC = () => {
  useWarmUpBrowser();

  const { startSSOFlow } = useSSO();
  const router = useRouter();

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

  return (
    <SafeAreaView className={containerStyle}>
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
      <View className="flex-row items-center mt-6">
        <View className="flex-1 h-px bg-gray-300" />
        <View className="mx-3 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
          <Text className="text-gray-500 text-sm">OR</Text>
        </View>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      <View className="gap-8 mt-8">
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
    </SafeAreaView>
  );
};

const containerStyle = "flex-1 bg-white p-4";
const touchableStyle =
  "bg-white py-4 px-4 rounded-lg border border-dark flex-row items-center justify-center";
const iconStyle = "absolute left-4";
const textStyle = "font-semibold text-lg text-center flex-1";

export default LoginScreen;

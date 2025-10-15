import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ExploreScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <View>
        <Link href="/(modals)/login">
          <Text>Login</Text>
        </Link>
        <Link href="/(modals)/booking">
          <Text>Booking</Text>
        </Link>
        <Link
          href={{
            pathname: "/listing/[id]",
            params: { id: "1337" },
          }}
        >
          <Text>Listing Details</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default ExploreScreen;

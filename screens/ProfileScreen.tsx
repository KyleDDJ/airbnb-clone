import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useEffect } from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen: React.FC = () => {
  const { signOut, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      signOut();
    }
  }, []);

  return (
    <SafeAreaView>
      <Button title="Log out" onPress={() => signOut()} />
      {!isSignedIn && (
        <Link href="/(modals)/login">
          <Text>Sign in</Text>
        </Link>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;

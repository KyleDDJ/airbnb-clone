import listingsData from "@/assets/data/airbnb-listings-full.json";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import { Stack } from "expo-router";
import { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ExploreScreen: React.FC = () => {
  const [category, setCategory] = useState("Tiny homes");
  const items = useMemo(() => listingsData as any, []);

  const onDataChanged = (category: string) => {
    setCategory(category);
  };
  return (
    <>
      <Stack.Screen
        options={{
          title: "Explore",
          headerShown: false,
        }}
      />
      <SafeAreaView className={containerStyle}>
        <ExploreHeader onCategoryChanged={onDataChanged} />
        <Listings listing={items} category={category} />
      </SafeAreaView>
    </>
  );
};

const containerStyle = "flex-1 bg-white";
export default ExploreScreen;

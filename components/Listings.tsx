import { useEffect } from "react";
import { Text, View } from "react-native";

interface Props {
  listing: any[];
  category: string;
}

const Listings: React.FC<Props> = ({ listing, category }) => {
  useEffect(() => {
    console.log("RELOAD LISTINGS", listing.length);
  }, [category]);
  return (
    <View className={containerStyle}>
      <Text>Listings</Text>
    </View>
  );
};

const containerStyle = "flex-1 mt-16";

export default Listings;

import Colors from "@/constants/Colors";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

interface Props {
  listing: any[];
  category: string;
}

const Listings = ({ listing, category }: Props) => {
  const [is_loading, setIsLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    console.log("RELOAD LISTINGS", listing.length);

    setIsLoading(true);

    setTimeout(() => {
      listRef.current?.scrollToIndex({
        index: 0,
        animated: true,
      });
      setIsLoading(false);
    }, 1200);
  }, [category]);

  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          className={listingStyle}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          <Image
            source={{ uri: item.medium_url }}
            style={{ width: "100%", height: 200, borderRadius: 10 }}
          />
          <TouchableOpacity className="absolute top-4 right-8">
            <Ionicons name="heart-outline" size={25} color={Colors.primary} />
          </TouchableOpacity>
        </Animated.View>
        <View className={listingContainerStyle}>
          <View className={listingInfoStyle}>
            <Text className="font-semibold">{item.name}</Text>
            <View className="flex-row gap-1 items-center">
              <AntDesign name="star" size={15} color={Colors.yellow} />
              <Text className="text-yellow text-sm font-semibold">
                {item.review_scores_rating / 20}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between gap-1">
            <Text className="text-gray-500 text-md py-1">{item.room_type}</Text>
            <View className="flex-row items-center">
              <Entypo name="location-pin" size={15} color={Colors.gray500} />
              <Text className="text-gray-500 text-sm">{item.city}</Text>
            </View>
          </View>
          <View className="gap-1 flex-row ">
            <Text className="text-dark font-bold text-md">$ {item.price}</Text>
            <Text className="text-dark text-md">/Night</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View className={containerStyle}>
      {is_loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          ref={listRef}
          data={listing}
          renderItem={renderRow}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        />
      )}
    </View>
  );
};

const containerStyle = "flex-1";
const listingStyle = "flex-row items-center justify-between px-4  my-4";
const listingContainerStyle = "px-4 mb-8 gap-2";
const listingInfoStyle = "flex-row items-center justify-between";

export default Listings;

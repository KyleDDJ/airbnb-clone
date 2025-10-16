import { categories } from "@/constants/Categories";
import Colors from "@/constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Props {
  onCategoryChanged: (category: string) => void;
}

const ExploreHeader: React.FC<Props> = ({ onCategoryChanged }) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<(View | null)[]>([]);
  const [active_index, setActiveIndex] = useState(0);

  const handleCategoryPress = (index: number) => {
    const selected = itemRef.current[index];

    selected?.measure(x => {
      scrollRef.current?.scrollTo({ x: x - 16, animated: true });
    });
    if (selected) {
      setActiveIndex(index);
      selected.focus();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onCategoryChanged(categories[index].name);
    }
  };

  return (
    <View className={containerStyle}>
      <View className={actionRow}>
        <Link href="/(modals)/booking" asChild>
          <TouchableOpacity className={searchButton}>
            <Ionicons name="search-outline" size={24} color={Colors.dark} />
            <View>
              <Text className="text-dark font-bold text-base">Where to?</Text>
              <Text className="text-gray-500 text-sm">
                Anywhere • Any week • Add guests
              </Text>
            </View>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity className={actionButton}>
          <Ionicons name="options-outline" size={24} color={Colors.dark} />
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          gap: 35,
          paddingHorizontal: 16,
          paddingVertical: 10,
        }}
      >
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            ref={el => {
              itemRef.current[index] = el as any;
            }}
            onPress={() => handleCategoryPress(index)}
            className={
              active_index === index ? activeCategoriesButton : categoriesButton
            }
          >
            <MaterialIcons
              name={item.icon as any}
              size={24}
              color={active_index === index ? Colors.primary : Colors.grey}
            />
            <Text
              className={
                active_index === index ? activeCategoryText : categoryText
              }
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// const defaultContainerStyle = "flex-1";
const containerStyle = "bg-white h-[150px] justify-start mt-5";
const actionRow = "flex-row items-center justify-between px-6 pb-4";
const searchButton =
  "flex-row items-center gap-3 bg-white flex-1 border border-gray-300 rounded-full px-4 py-4 shadow-lg shadow-gray-900";
const actionButton = "ml-3 p-3 rounded-full border border-dark";
const categoryText = "text-gray-500 text-base";
const activeCategoryText = "text-primary font-bold text-base";
const categoriesButton = "flex-1 align-center items-center justify-center pb-2";
const activeCategoriesButton =
  "flex-1 align-center items-center justify-center border-b-2 border-primary pb-2";

export default ExploreHeader;

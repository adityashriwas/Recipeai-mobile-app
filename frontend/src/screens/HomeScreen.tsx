import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import BannerCarousal from '../components/BannerCarousal';
import { useQuery } from '@tanstack/react-query';
import { Category, fetchCategories } from '../api/apiClient';
import CategoryCard from '../components/CategoryCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainRoutes, MainTabParamList } from '../navigation/Routes';
import { useNavigation } from '@react-navigation/native';

function CategorySkeletonRow() {
  const placeholder = Array.from({ length: 8 }, (_, i) => i.toString());

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pb-1"
      >
        {placeholder?.map(k => (
          <View className="mr-4 w-20 items-center" key={k}>
            <View className="h-16 w-16 rounded-full bg-zinc-200 animate-pulse" />
            <View className="h-16 w-14 rounded bg-zinc-200 animate-pulse mt-2" />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const HomeScreen = () => {
  const [query, setQuery] = useState('');

  //home screen data:
  const products = [
    {
      id: '1',
      name: 'Cow Milk Packet',
      price: 70,
      imageUrl:
        'https://cdn.zeptonow.com/production/tr:w-403,ar-1000-1000,pr-true,f-auto,q-80/cms/product_variant/a05ee90f-d81b-43a5-8f40-8c16a981730e.jpeg',
    },
    {
      id: '2',
      name: 'Buffalo Milk',
      price: 80,
      imageUrl:
        'https://www.bbassets.com/media/uploads/p/l/40149834_1-nandini-shubham-milk.jpg',
    },
    {
      id: '3',
      name: 'Ghee (500g)',
      price: 500,
      imageUrl: 'https://via.placeholder.com/300x200?text=Ghee',
    },
    {
      id: '4',
      name: 'Paneer Block',
      price: 200,
      imageUrl: 'https://via.placeholder.com/300x200?text=Paneer',
    },
  ];

  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<MainTabParamList>>();

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-green-700">
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'#15803D'}
        translucent={false}
      />

      <View className="bg-green-700">
        <Header />
        <View className="px-4 pb-4">
          <SearchBar value={query} onChange={setQuery} />
        </View>
      </View>

      <ScrollView className="flex-1 bg-white rounded-t-3xl">
        <View className="pb-10">
          <View className="pt-4">
            <BannerCarousal />
          </View>

          <View className="px-4 mt-4">
            <Text className="text-xl font-bold">New Kitchen Essentials</Text>
            {isLoading ? (
              <CategorySkeletonRow />
            ) : (
              <FlatList<Category>
                data={categories ?? []}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                className="mt-4"
                renderItem={({ item }) => {
                  return (
                    <CategoryCard
                      name={item.name}
                      image={item.imageUrl}
                      onPress={() =>
                        navigation.navigate(
                          MainRoutes.Category as never,
                          {
                            categoryName: item.name,
                          } as never,
                        )
                      }
                    />
                  );
                }}
              />
            )}
          </View>

          <View className="px-4 mt-3">
            <View className="flex-row items-center mt-3 justify-between">
              <Text className="text-xl font-bold">Flash sale</Text>
              <Text className="text-purple-600">View All</Text>
            </View>
          </View>
          <View className="px-4 mt-3">
            <View className="flex-row items-center mt-3 justify-between">
              <Text className="text-xl font-bold">Pujo Specials</Text>
              <Text className="text-purple-600">View All</Text>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-3"
          >
            {products.map(product => (
              <View key={product.id} className="px-4 mt-3">
                <View className="mt-2">
                  <Image
                    source={{ uri: product.imageUrl }}
                    className="w-full h-40 rounded-lg"
                    resizeMode="cover"
                  />
                  <Text className="mt-2 text-base font-semibold">
                    {product.name}
                  </Text>
                  <Text className="mt-1 text-sm text-gray-500">
                    ₹{product.price}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

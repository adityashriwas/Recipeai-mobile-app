import { Image, ScrollView, StatusBar, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import BannerCarousal from '../components/BannerCarousal';

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

          {/* Categories */}
          {/* <View>
          
          </View> */}

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

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
            {
              products.map((product) => (
                <View key={product.id} className="px-4 mt-3">
                  <View className="mt-2">
                    <Image
                      source={{ uri: product.imageUrl }}
                      className="w-full h-40 rounded-lg"
                      resizeMode="cover"
                    />
                    <Text className="mt-2 text-base font-semibold">{product.name}</Text>
                    <Text className="mt-1 text-sm text-gray-500">₹{product.price}</Text>
                  </View>
                </View>
              ))
            }
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

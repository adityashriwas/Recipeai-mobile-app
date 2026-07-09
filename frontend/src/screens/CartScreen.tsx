import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import { MainStackParamList } from '../navigation/Routes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCartStore } from '../store/useCartStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';

const CartScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const items = useCartStore(s => s.items);
  const updateQuantity = useCartStore(s => s.updateQuantity);
  const removeItem = useCartStore(s => s.removeItem);
  const addItem = useCartStore(s => s.addItem);

  const exclusiveDeals = [
    {
      id: 'deal1',
      title: 'Fresh Indian Baasa / Pangasius - Boneless Filler',
      price: 340,
      image:
        'https://imgs.search.brave.com/7J1lhb8p4ABAcSMn856Fm5Ci8rJJu_jCQ-en-dFEuhg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi85Lzk5L1Bh/bmdhc2lpZGFlXy1f/UGFuZ2FzaXVzX3Nh/bml0d29uZ3NlaS5q/cGcvNTEycHgtUGFu/Z2FzaWlkYWVfLV9Q/YW5nYXNpdXNfc2Fu/aXR3b25nc2VpLmpw/Zw',
      badge: '56% OFF',
    },
    {
      id: 'deal2',
      title: 'Large Catfish / Etta Koori - Steaks',
      price: 450,
      image:
        'https://imgs.search.brave.com/pfcfhgu3G-czXDiYGJ7eE4Ub2YH9O-coTQVxGglz7mo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hLXot/YW5pbWFscy5jb20v/bWVkaWEvMjAyMy8w/MS9pU3RvY2stMTEz/OTMzNzkyNi5qcGc',
      badge: '13% OFF',
    },
  ];

  const renderItem = ({ item }: { item: CartItem }) => (
    <View className="bg-white rounded-xl p-4 mb-4 flex-row shadow-lg">
      <View className="flex-1 pr-3">
        <Text className="text-base font-semibold">{item?.name}</Text>
        <Text className="text-lg font-extrabold mt-1">
          {item?.price * (item.quantity || 1)}
        </Text>
        <Text className="text-sm text-gray-500">1 Pack</Text>

        <View className="flex-row items-center mt-2">
          <Ionicons name="bicycle" size={16} color={'#6B7280'} />
          <Text>Today in 16 minutes</Text>
        </View>

        <Pressable
          className="flex-row items-center mt-2"
          onPress={() => removeItem(item?.id)}
        >
          <Ionicons name="trash-outline" size={16} color={'#6B7280'} />
          <Text className="text-sm text-gray-500 ml-2">Remove</Text>
        </Pressable>
      </View>

      <View className="items-center w-28">
        <Image
          source={{ uri: item?.imageUrl }}
          className="w-24 h-24 rounded-lg mb-3"
        />
        <View className="flex-row items-center border border-green-200 rounded-lg px-3 py-1 justify-between">
          <Pressable onPress={() => updateQuantity(item.id, -1)}>
            <Text className="text-lg font-bold text-green-600">-</Text>
          </Pressable>
          <Text className="text-base font-semibold">{item?.quantity}</Text>
          <Pressable onPress={() => updateQuantity(item.id, 1)}>
            <Text className="text-lg font-bold text-green-600">+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  const renderDeal = (d: (typeof exclusiveDeals)[0]) => {
    const quantity = items?.find((i: any) => i.id === d.id)?.quantity || 0;
    return (
      <View
        className="bg-white rounded-lg p-3 w-48 mr-4 shadow-sm flex-col justify-between"
        key={d.id}
      >
        <Text className="bg-pink-500 text-white px-2 py-1 rounded-full mb-2 text-xs font-bold self-start">
          {d.badge}
        </Text>
        <Image
          source={{ uri: d.image }}
          className="h-28 w-full rounded-md mb-2"
        />
        <Text className="text-sm font-semibold mb-1">{d.title}</Text>
        <Text className="text-lg font-extrabold mb-2">{d.price}</Text>
        {quantity > 0 ? (
          <View className="flex-row items-center border-gray-200 rounded-lg px-3 py-1 justify-between w-full">
            <View className="flex-row items-center border border-green-200 rounded-lg px-3 py-1 justify-between">
              <Pressable onPress={() => updateQuantity(d.id, -1)}>
                <Text className="text-lg font-bold text-green-600">-</Text>
              </Pressable>
              <Text className="text-base font-semibold">{quantity}</Text>
              <Pressable onPress={() => updateQuantity(d.id, 1)}>
                <Text className="text-lg font-bold text-green-600">+</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <Pressable
            onPress={() =>
              addItem({
                id: d.id,
                name: d.title,
                price: d.price,
                imageUrl: d.image,
              })
            }
            className="bg-green-600 py-2 rounded-md items-center"
          >
            <Text className="text-white font-bold">Add to Cart</Text>
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Text className="text-xl font-bold text-center py-4">Your Cart</Text>
      <View className="bg-purple-50 border border-purple-300 border-dashed rounded-lg mx-4 p-3 mb-4">
        <Text>Get 60 count Prawns @299 | Use code: 2999 (TCA)</Text>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        className="px-4"
        ListFooterComponent={
          <View className="mt-6">
            <Text className="text-lg font-bold mb-4">
              Exclusive offers for you
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="pb-6"
            >
              {exclusiveDeals?.map(renderDeal)}
            </ScrollView>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default CartScreen;

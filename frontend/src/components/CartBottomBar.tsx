import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useCartStore } from '../store/useCartStore';
import { useNavigation } from '@react-navigation/native';
import { MainRoutes } from '../navigation/Routes';

const CartBottomBar = () => {
  const totalItems = useCartStore(state => state.getTotalItems());
  const totalPrice = useCartStore(state => state.getTotalPrice());
  const navigation = useNavigation();

  if (totalItems === 0) return null;
  return (
    <View className="absolute bottom-10 left-5 right-5 flex-row items-center justify-between bg-emerald-500 px-3 py-3 rounded-t-3xl shadow-lg shadow-black/10 elevation-3">
      <Text className='font-medium text-white'>
        {totalItems} Items | Rs. {totalPrice}
      </Text>
      <Pressable 
        onPress={() => navigation.navigate(MainRoutes.Cart)}
        className="bg-white px-4 py-2 rounded-lg">
        <Text className="text-emerald-500 font-bold">View Cart</Text>
      </Pressable>
    </View>
  );
};

export default CartBottomBar;

import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Ionicons from "@expo/vector-icons/Ionicons";

const AddCategoryScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string; imageUrl?: string }>({
    defaultValues: { name: "", imageUrl: "" },
  });
  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-lg font-bold text-gray-900 mb-2">
        AddCategoryScreen
      </Text>
      <Text className="text-sm text-gray-600 mb-4">
        Give it a short, clear name
      </Text>

      <Text className="text-sm mb-2 font-medium text-gray-700">
        Category Name
      </Text>
      <Controller
        control={control}
        name="name"
        rules={{
          required: "Category name is required",
          minLength: { value: 2, message: "Too Short" },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="E.g Beverages"
            value={value}
            onChangeText={onChange}
            className="bg-white p-3 rounded-lg border border-gray-200"
          />
        )}
      />
      {errors?.name && (
        <Text className="text-red-500 mt-2">{errors.name.message}</Text>
      )}

      <Text className="text-sm mb-2 font-medium text-gray-700 mt-4">
        Image URL
      </Text>
      <Controller
        control={control}
        name="imageUrl"
        rules={{
          pattern: { value: /^https?:\/\/.+/i, message: "Invalid URL" },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="E.g https://example.com/image"
            value={value}
            onChangeText={onChange}
            className="bg-white p-3 rounded-lg border border-gray-200"
          />
        )}
      />
      {errors?.imageUrl && (
        <Text className="text-red-500 mt-2">{errors.imageUrl.message}</Text>
      )}

      <Pressable
        onPress={handleSubmit}
        className="mt-6 bg-black py-3 rounded-lg flex-row justify-center items-center"
      >
        <Ionicons name="save" size={18} color={"#fff"} />
        <Text className="text-white font-semibold ml-2">Create Category</Text>
      </Pressable>
    </View>
  );
};

export default AddCategoryScreen;

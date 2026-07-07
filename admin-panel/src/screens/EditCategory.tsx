import { View, Text, TextInput, Pressable, Alert } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import Ionicons from "@expo/vector-icons/Ionicons";
import { fetchCategory, updateCategory } from "../api/apiClient";

const EditCategory = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { categoryId } = route.params;
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<{ name: String; imageUrl?: string }>({
    defaultValues: { name: "", imageUrl: "" },
  });

  const { data: category, isLoading } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => fetchCategory(categoryId),
  });

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setValue("imageUrl", category.imageUrl || "");
    }
  }, [category, setValue]);

  const mutation = useMutation({
    mutationFn: ({ name, imageUrl }: { name: string; imageUrl?: string }) =>
      updateCategory(categoryId, { name, imageUrl }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      navigation.goBack();
    },
    onError: (error) => Alert.alert("Error", "Failed to update category"),
  });

  const onSubmit = (data: { name: string; imageUrl?: string }) =>
    mutation.mutate({ name: data.name, imageUrl: data.imageUrl });

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-lg font-bold text-gray-900 mb-2">EditCategory</Text>
      <Text className="text-sm text-gray-600 mb-4">
        Update the category details
      </Text>

      <Text>Category Name</Text>
      <Controller
        control={control}
        name="name"
        rules={{
          required: "Category name is required",
          minLength: { value: 2, message: "Too Short" },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Beverages"
            value={value}
            onChangeText={onChange}
            className="bg-white p-3 rounded-lg border border-gray-200"
          />
        )}
      />
      {errors.name && (
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
        onPress={handleSubmit(onSubmit)}
        className="mt-6 bg-black py-3 rounded-lg flex-row justify-center items-center"
      >
        <Ionicons name="save" size={18} color={"#fff"} />
        <Text className="text-white font-semibold ml-2">Create Category</Text>
      </Pressable>
    </View>
  );
};

export default EditCategory;

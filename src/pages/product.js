import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const Product = ({ navigation, route }) => {
  const { product } = route.params;
  navigation.setOptions({ title: product.title });

  return <WebView source={{ uri: product.url }} />;
};

export default Product;
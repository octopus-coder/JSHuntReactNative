import React, { Component, useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from "react-native";
import api from '../services/api';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Main({ navigation }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [productsInfo, setProductsInfo] = useState({});

  navigation.setOptions({ title: 'JSHunt' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(`/products?page=${page}`);
        const { docs, ...productsInfo } = response.data;
        setProducts([...products, ...docs]);
        setProductsInfo(productsInfo);
      } catch (error) {
      }
    };
    fetchProducts();
  }, [page]);

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <TouchableOpacity
        style={styles.productButton}
        onPress={() => navigation.navigate('Product', { product: item })}
      >
        <Text style={styles.productButtonText}> Review </Text>
      </TouchableOpacity>
    </View>
  );

  const loadMore = () => {
    if (page === productsInfo.pages) return;
    setPage(page + 1);
  };

  return (
    <View style={styles.Container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={products}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
  productContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    marginTop: 5,
    fontSize: 15,
    color: '#888',
    lineHeight: 22,
    marginBottom: 5,
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#f4511e',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  productButtonText: {
    fontSize: 16,
    color: '#f4511e',
    fontWeight: 'bold',
  }
});

export default Main;
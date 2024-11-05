import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getPosts } from "./services/axios";
import Forms from './Form';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((res) => {
      if (res.status === 200) {
        setPosts(res.data);
      }
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {posts.map((post) => (
        <TouchableOpacity
          key={post.id}
          style={styles.card}
          onPress={() => navigation.navigate('Forms', { post })}
        >
          <Text style={styles.title}>{post.title}</Text>
          <Text>{post.body}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Forms" component={Forms} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { padding: 16, marginVertical: 8, backgroundColor: '#f9f9f9', borderRadius: 8 },
  title: { fontSize: 16, fontWeight: 'bold' },
});

export default App;

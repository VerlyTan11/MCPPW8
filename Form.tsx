import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { updatePost } from "./services/axios";

const Forms = ({ route, navigation }) => {
  const { post } = route.params;
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleUpdate = () => {
    updatePost(post.id, { title, body }).then((res) => {
      if (res.status === 200) {
        navigation.navigate("Home", { updatedPost: { ...post, title, body } });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Post</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <TextInput
        style={styles.input}
        value={body}
        onChangeText={setBody}
        placeholder="Body"
        multiline
      />
      <Button title="Update Post" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});

export default Forms;

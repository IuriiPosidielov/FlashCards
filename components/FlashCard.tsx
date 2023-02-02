import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IFlashCard {
  text: string;
  completed: boolean;
}

export default function FlashCard() {
  const [value, setValue] = useState<string>("");
  const [FlashCardList, setFlashCards] = useState<IFlashCard[]>([]);
  const [error, showError] = useState<Boolean>(false);
  useEffect(() => {
    AsyncStorage.setItem("FlashCards", JSON.stringify(FlashCardList));
  }, [FlashCardList])

  useEffect( () => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem("FlashCards");
        const state = savedStateString ? JSON.parse(savedStateString) : [];
        setFlashCards(state);
      } finally {
      }
    };
    restoreState();
  }, []);

  const handleSubmit = (): void => {
    if (value.trim())
      setFlashCards([...FlashCardList, { text: value, completed: false }]);
    else showError(true);
    setValue("");
  };

  const removeItem = (index: number): void => {
    const newFlashCardList = [...FlashCardList];
    newFlashCardList.splice(index, 1);
    setFlashCards(newFlashCardList);
  };

  const toggleComplete = (index: number): void => {
    const newFlashCardList = [...FlashCardList];
    newFlashCardList[index].completed = !newFlashCardList[index].completed;
    setFlashCards(newFlashCardList);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>FlashCard List</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Please enter your FlashCard..."
          value={value}
          onChangeText={e => {
            setValue(e);
            showError(false);
          }}
          style={styles.inputBox}
        />
        <Button title="Add FlashCard" onPress={handleSubmit} />
      </View>
      {error && (
        <Text style={styles.error}>Error: Input field is empty...</Text>
      )}
      <Text style={styles.subtitle}>Your FlashCards :</Text>
      {FlashCardList.length === 0 && <Text>No to do FlashCard available</Text>}
      {FlashCardList.map((FlashCard: IFlashCard, index: number) => (
        <View style={styles.listItem} key={`${index}_${FlashCard.text}`}>
          <Text
            style={[
              styles.FlashCard,
              { textDecorationLine: FlashCard.completed ? "line-through" : "none" }
            ]}
          >
            {FlashCard.text}
          </Text>
          <Button
            title={FlashCard.completed ? "Completed" : "Complete"}
            onPress={() => toggleComplete(index)}
          />
          <Button
            title="X"
            onPress={() => {
              removeItem(index);
            }}
            color="crimson"
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 35,
    alignItems: "center"
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  inputBox: {
    width: 200,
    borderColor: "purple",
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 8
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: "purple"
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10
  },
  addButton: {
    alignItems: "flex-end"
  },
  FlashCard: {
    width: 200
  },
  error: {
    color: "red"
  }
});
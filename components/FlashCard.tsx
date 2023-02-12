import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, Button, Image } from "react-native";
import Translate from './API/Translate';
import SearchImage from './API/SearchImage';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../stores/configureStores'
import  { cardAdded, cardToggled, cardRemoved } from '../reducers/cardsReducer'
import { useNavigation } from '@react-navigation/native';

export default function flashCard() {
  const [value, setValue] = useState<string>("");
  const [error, showError] = useState<Boolean>(false);
  const flashCardList = useSelector(( state:RootState ) => state.cards.items);
  const fromLanguage = useSelector(( state:RootState ) => state.settings.fromLanguage);
  const toLanguage = useSelector(( state:RootState ) => state.settings.toLanguage);
  
  const dispatch = useDispatch();
  type Nav = {
    navigate: (value: string, object : any) => void;
  }
  const { navigate } = useNavigation<Nav>()

  
  const handleSubmit = async () => {
    if (value === "")  {
      // simple validation
      showError(true);
      return;
    }
    let picture = await SearchImage(value);
    let translation = await Translate(value, fromLanguage, toLanguage);
      
    if (value.trim()) {
      dispatch(cardAdded({ origin: value, translation: translation, picture: picture, completed: false }))
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Please enter your text"
          value={value}
          onChangeText={e => {
            setValue(e);
            showError(false);
          }}
          style={styles.inputBox}
        />
        <Button title="Add flashCard" onPress={ () => { handleSubmit();} } />
      </View>
      {error && (
        <Text style={styles.error}>Error: Input field is empty...</Text>
      )}
      <Text style={styles.subtitle}>Your flashCards :</Text>
      {flashCardList.length === 0 && <Text>No flashCard available</Text>}
      <ScrollView style={{flex:1}} contentContainerStyle={{ flexGrow: 1 }}>  
      {flashCardList.map((flashCard, index: number) => (
        <View style={styles.listItem} key={`${index}_${flashCard.origin}`}>
          <Text
            style={[
              styles.flashCard,
              { textDecorationLine: flashCard.completed ? "line-through" : "none" }
            ]}
          >
            {flashCard.origin} ({flashCard.translation})
            { flashCard.picture !== "" && <Image style={styles.tinyLogo} resizeMode="center" source={{ uri: flashCard.picture }} /> }
          </Text>
          <Button
            title={flashCard.completed ? "Completed" : "Complete"}
            onPress={() => dispatch(cardToggled(flashCard.origin)) }
          />
          <Button
            title="X"
            onPress={() => {
              dispatch(cardRemoved(flashCard.origin))
            }}
            color="crimson"
          />
          <Button
            title="Details"
            onPress={() => {
              navigate("Modal", {index: index, picture:flashCard.picture, origin:flashCard.origin, translation: flashCard.translation});
            }}
          />
        </View>
      ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 150,
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
    width: "70%",
    marginBottom: 10
  },
  addButton: {
    alignItems: "flex-end"
  },
  flashCard: {
    width: "80%"
  },
  error: {
    color: "red"
  },
  tinyLogo: {
  },
});
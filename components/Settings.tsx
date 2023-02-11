import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from "react";
import { StyleSheet, Text, View  } from "react-native";
import  { setFromLanguage, setToLanguage } from '../reducers/settingsReducer'
import DropDownPicker from 'react-native-dropdown-picker'
import { RootState } from '../stores/configureStores'

export default function Settings() {
    const dispatch = useDispatch();

    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);
    
    const fromLanguage = useSelector(( state:RootState ) => state.settings.fromLanguage);
    const toLanguage = useSelector(( state:RootState ) => state.settings.toLanguage);
    
    const [valueFrom, setValueFrom] = useState(fromLanguage);
    const [valueTo, setValueTo] = useState(toLanguage);
    const [items, setItems] = useState([
        {label: 'English', value: 'en'},
        {label: 'Poland', value: 'pl'},
        {label: 'German', value: 'de'},
        {label: 'France', value: 'fr'},
    ]);

    const changeValueFrom = () => {
      dispatch(setFromLanguage(valueFrom));
    };
  
    const changeValueTo = () => {
      dispatch(setToLanguage(valueTo));
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.dropdown}>
          <Text style={styles.inputWrapper}>From:</Text>
          <DropDownPicker
              style={styles.inputWrapper}
              open={openFrom}
              value={valueFrom}
              items={items}
              setOpen={setOpenFrom}
              setValue={setValueFrom}
              setItems={setItems}
              onChangeValue={changeValueFrom}
          />
        </View>
        <View style={styles.dropdown}>
          <Text style={styles.inputWrapper}>To:</Text>
          <DropDownPicker
            style={styles.inputWrapper}
            open={openTo}
            value={valueTo}
            items={items}
            setOpen={setOpenTo}
            setValue={setValueTo}
            setItems={setItems}
            onChangeValue={changeValueTo}
          />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "row",
    },
    inputWrapper: {
      width: 150,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
      marginTop: 10
    },
    dropdown: {
      width: "50%",
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
      width: "80%",
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
    }
  });
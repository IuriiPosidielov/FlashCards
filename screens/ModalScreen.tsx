import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image } from 'react-native';
import { Text, View } from '../components/Themed';
import { useRoute } from '@react-navigation/native';

export default function ModalScreen() {
  const route : any = useRoute();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.origin} ({route.params.translation})</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Image style={{width: 400, height: 400}} source={{uri: route.params.picture }} />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

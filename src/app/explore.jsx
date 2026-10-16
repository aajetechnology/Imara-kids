import { StyleSheet, Text, View } from "react-native";

export default function ExploreScreen(){
  return(
    <View style={styles.container}>
        <Text style={styles.title}>Explore Imara Kids</Text>
    </View>

  );
}
const styles = StyleSheet.create({
    container:{flex:1, justifyContent:"center", alignItems:'center', backgroundColor:"#FFF9F1",},
    title:{fontSize:22, fontWeight: "bold", color:"#000834C",},
});
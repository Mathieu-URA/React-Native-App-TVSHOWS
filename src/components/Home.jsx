import { Button, Text } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FlatList, Image, TextInput, TouchableOpacity, View } from "react-native";



export const Home = ({ navigation }) => {
  const [search, setSearch] = React.useState("");
  const [shows, setShows] = React.useState([]);

  const handleSearch = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
      .then((res) => res.json())
      .then((data) => setShows(data))
      .catch((err) => console.error(err));
  };

  return (
    <>
    <LinearGradient style={{flex:1,alignItems:"center"}}  colors={['#A9C9FF','#FFBBEC']}>
      <Text h2>Accueil</Text>
      <View onSubmit={handleSearch} style={{width: '100%', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
        <TextInput type="text" onChangeText={(e) => setSearch(e)} style={{width: '80%',borderWidth: 1, borderRadius: 5, padding: 3, marginBottom:10}} />
        <Button onPress={handleSearch} title="Search" style={{borderRadius: 10}} ViewComponent={LinearGradient}
          linearGradientProps={{
          colors: ["#6190E8", "#A7BFE8"],
            start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
          }}>

  </Button>
      </View>
      <FlatList contentContainerStyle={{alignItems:"center"}}
        data={shows}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Shows", { id: item.show.id });
            }}
          >
            <Text h4 style={{marginBottom:20, marginTop: 20}}>{item.show.name}</Text>
            <Image
              source={{ uri: item.show.image?.medium }}
              style={{ width: 200, height: 200 , borderRadius:20}}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.show.id}
      />
      </LinearGradient>
    </>
    
  );
};

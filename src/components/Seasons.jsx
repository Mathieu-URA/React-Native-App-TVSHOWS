import { Text } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";


export const Seasons = ({route, navigation}) => {
	const { id, seasonId }  = route.params

	const [show, setShow] = React.useState({});
	const [season, setSeason] = React.useState({});
	const [episodes, setEpisodes] = React.useState([]);

	React.useEffect(() => {
		fetch(`https://api.tvmaze.com/shows/${id}`)
			.then(res => res.json())
			.then(show => setShow(show));

		fetch(`https://api.tvmaze.com/seasons/${seasonId}`)
			.then(res => res.json())
			.then(season => setSeason(season));

		fetch(`https://api.tvmaze.com/seasons/${seasonId}/episodes`)
			.then(res => res.json())
			.then(episodes => {
				setEpisodes(episodes);
				
			});
	}, []);

	return (
		<LinearGradient style={{flex:1, alignItems:"center"}}  colors={['#A9C9FF','#FFBBEC']}>
		<View id="season">
			<View id="season-top" style={{alignItems:"center"}}>
				<Text h1>{show.name} {console.log(season)}</Text>
				<Text h4>{season.name}</Text>
                <Image
                                    source={{ uri: season.image?.medium }}
                                    style={{ width: 200, height: 200 , borderRadius:20}}
                                    
                                />
				
				<Text style={{marginTop:10, marginBottom: 10}}>
					Diffusé par {season.network?.name} au {season.network?.country?.name}
					
					
				</Text>
				<Text style={{marginTop:10, marginBottom: 10}}>
					Première sortie: {season.premiereDate}
				</Text>
			</View>
			<View id="episodes">

                        <FlatList contentContainerStyle={{alignItems:"center"}}
                            data={episodes}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("Episodes", { id, seasonId , episodeId: item.id });
                                  }} >
                                <Text h4 style={{marginTop:10, marginBottom:10}}>Episode n° {item.number}</Text>
                                <Image
                                    source={{ uri: item.image?.medium }}
                                    style={{ width: 200, height: 200 }}
                                    
                                />
                                </TouchableOpacity>

                            )}
                            keyExtractor={(item) => item.id}
                        />

			</View>
		</View>
		</LinearGradient>
	);
};

import { Text } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FlatList, Image, ScrollView, TouchableOpacity, View } from "react-native";
import RenderHTML from "react-native-render-html";

import Icon from 'react-native-vector-icons/AntDesign'


export const Shows = ({route, navigation}) => {
	const { id } = route.params
    

	const [show, setShow] = React.useState({});
	const [seasons, setSeasons] = React.useState([]);

	React.useEffect(() => {
		fetch(`http://api.tvmaze.com/shows/${id}?embed=cast`)
			.then(res => res.json())
			.then(data => setShow(data))
			.catch(err => console.error(err));

		fetch(`https://api.tvmaze.com/shows/${id}/seasons`)
			.then(res => res.json())
			.then(data => {
				setSeasons(data);
			})
			.catch(err => console.error(err));

		
	}, []);

	

	return (
        <LinearGradient style={{flex:1}}  colors={['#A9C9FF','#FFBBEC']}>
		<ScrollView >
			<Text h1 style={{marginBottom: 10 ,textAlign:"center"}}>{show.name}</Text>
			<View id="show-top" >
				<View id="show-left" style={{alignItems:"center"}}>
                <Image
                    source={{ uri: show.image?.medium }}
                    style={{ width: 200, height: 200 , borderRadius:20 }}
                />
			
					
				</View>
				<View id="show-right" style={{marginTop:10}}>
					<View id="show-genres">
						<Text h4  style={{marginTop:10 ,textAlign:"center"}} id="genres">Genres :</Text>
                        <View>
                        <FlatList   contentContainerStyle={{alignItems:"center"}}
                            data={show?.genres}
                            renderItem={({ item }) => (
                                
                                <Text style={{marginTop:10, backgroundColor:'#A9C9FF', width:80, borderWidth:1, borderRadius:20,textAlign:"center"}}>
                                    
                                    #{item}
                                </Text>

                            )}
                            keyExtractor={(item) => item}
                        />
                        </View>
					</View>

					<Text h4 id="rating" style={{marginTop:30, textAlign:"center"}}>
                    
						Note: {show.rating?.average}
                        <Icon
                    name='staro' size={22}/>
					</Text>
					<Text h4 id="nb-seasons" style={{marginTop:30, textAlign:"center"}}>
						Nombre de saisons: {seasons.length}
					</Text>
					<RenderHTML baseStyle={{marginTop:30, textAlign:"center" , marginLeft:20 , marginRight:20}} contentWidth={200} source={{html:show.summary || "" }}></RenderHTML>
				</View>
			</View>
			<View id="seasons">
                    <Text h4 style={{marginTop:10 , textAlign:"center", marginBottom:20}}>Saisons :</Text>
                        <View>
                        <FlatList horizontal={true} contentContainerStyle={{alignItems:"center"}}
                            data={seasons}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("Seasons", { id, seasonId:item.id });
                                  }} >
                                <View style={{marginRight:20, marginLeft:20}}>
                                <Image
                                    source={{ uri: item.image?.medium }}
                                    style={{ width: 200, height: 200 , borderRadius:20 }}
                                    
                                />
                                </View>
                                </TouchableOpacity>

                            )}
                            keyExtractor={(item) => item.id}
                        />
                        </View>
			</View>
			<View id="casting">
            <Text h4 style={{marginTop:10 , textAlign:"center"}}>Acteurs :</Text>
            <View>
            <FlatList   contentContainerStyle={{alignItems:"center"}}
                            data={show._embedded?.cast}
                            renderItem={({ item }) => (
                                <View>
                                <Text style={{marginTop:10, maxWidth:200 ,fontWeight:"bold"}}> {item.person?.name} - {item.character?.name}</Text>
                                <View style={{marginTop:20}}>
                                <Image
                                    source={{ uri: item.person?.image?.medium }}
                                    style={{ width: 200, height: 200 , borderRadius:20}}
                                    
                                />
                                </View>
                                </View>
                            )}
                            keyExtractor={(item) => item.person?.id}
                        />
                        </View>
			</View>



			
		</ScrollView>
        </LinearGradient>
	);
};

import { Text } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, View } from "react-native";
import  Icon  from "react-native-vector-icons/AntDesign";
import RenderHTML from "react-native-render-html";


export const Episodes = ({route}) => {
	const { episodeId } = route.params
	const [episode, setEpisode] = React.useState({});

	React.useEffect(() => {
		fetch(`https://api.tvmaze.com/episodes/${episodeId}`)
			.then(res => res.json())
			.then(episode => setEpisode(episode));

		
	}, []);

	const WebView = React.memo(({html}) => {
        return(
            <RenderHTML baseStyle={{marginLeft:20 , marginRight:20}} contentWidth={200} source={{html}} id="summary"></RenderHTML>
        )
    })
	

	return (

        <LinearGradient style={{flex:1}}  colors={['#A9C9FF','#FFBBEC']}>
		<View id="episode" style={{alignItems:"center"}}>
			<Text h4 id="title" style={{marginBottom:20}}>{episode.name}</Text>
            <Image
                                    source={{ uri: episode.image?.medium }}
                                    style={{ width: 200, height: 200 , borderRadius:20}}
                                    
                                />
                                
            
			<WebView html={episode.summary || ""} ></WebView>
			<Text style={{marginTop:30, textAlign:"center", fontWeight:"bold"}}>
                
                    Note: {episode.rating?.average} 
                    <Icon
                        name='staro' size={17}/>
                </Text>
			
		</View>
        </LinearGradient>
	);
};

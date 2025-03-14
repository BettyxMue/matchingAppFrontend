// @ts-nocheck
import React, {useEffect, useRef,} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {getUserFromId} from "../connectors/ProfileServiceConnector";
import {Ionicons} from "@expo/vector-icons";
import {styles} from "../resources/Styles";
import {LinearGradient} from "expo-linear-gradient";
import { createChat } from '../connectors/ChatServiceConnector';

const MatchScreen = ({navigation, route}) => {

    const {userId, userSwipedId} = route.params
    const firstUpdate = useRef(true)

    const [userData, setUserData] = React.useState("")
    const [userSwipedData, setSwipedData] = React.useState("")
 
    let temp
    let temp2

    useEffect(() => {

        if(firstUpdate.current){
            createChatFromScreen(userSwipedId)
            firstUpdate.current = false;
        }

        GetUserData()
        GetUserSwipedData()

    }, [userId, userSwipedId])

    function GetUserData() {
        getUserFromId(userId).then(r => {
            console.log(r)
            temp = {
                firstName: r.firstName,
                name: r.name,
                pic: r.profilePicture
            }
            setUserData(temp)
        })
    }

    function GetUserSwipedData() {
        getUserFromId(userSwipedId).then(r => {
            temp2 = {
                firstName: r.firstName,
                name: r.name,
                pic: r.profilePicture
            }
            setSwipedData(temp2)
        })
    }

    function createChatFromScreen(matchedId){
        createChat(matchedId)
    }

    const GetImageSource = (source) => {
        return `data:image/jpeg;base64,${source}`
    }

    return (
        <LinearGradient colors={['#3860ff', '#389bff']} style={styles.container}>
            <View style={{
                height: "100%",
                width: "80%",
                paddingVertical: 150
            }}>
                <View style={{
                    alignItems: "center",
                    paddingBottom: "10%"
                }}>
                    <Ionicons name="happy" size={80} color="white"/>
                </View>
                <Text style={
                    {
                        marginTop: 5,
                        textAlign: "center",
                        fontSize: 30,
                        fontWeight: "bold",
                        color: "white"
                    }
                }>
                    Du und {userSwipedData.firstName} können einander etwas beibringen!
                </Text>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    width: "100%",
                    marginVertical: "10%"
                }}>
                    <Image
                        style={{
                            resizeMode: "cover",
                            height: 90,
                            width: 90,
                            borderRadius: 100,
                            margin: 10
                        }}
                        source={(userData.pic != null) ? {uri: GetImageSource(userData.pic)}:{uri: "https://cdn-icons-png.flaticon.com/512/3106/3106921.png"}}
                    />
                    <Image
                        style={{
                            resizeMode: "cover",
                            height: 90,
                            width: 90,
                            borderRadius: 100,
                            margin: 10
                        }}
                        source={(userSwipedData.pic != null) ? {uri: GetImageSource(userSwipedData.pic)}:{uri: "https://cdn-icons-png.flaticon.com/512/3106/3106921.png"}}
                    />
                </View>
                <TouchableOpacity style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 32,
                    borderRadius: 20,
                    elevation: 3,
                    backgroundColor: '#ffffff',
                    borderColor: '#ffffff',
                    marginHorizontal: "10%",
                    borderWidth: 1
                }}>
                    <Text
                        onPress={() => {
                            navigation.goBack();
                            navigation.navigate("Chat", {
                                userSwipedId
                            });
                        }}
                        style={{
                            textAlign: "center",
                            fontSize: 20,
                            color: "black"
                        }}
                    >
                        Schicke doch gleich eine Nachricht!
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}
export default MatchScreen
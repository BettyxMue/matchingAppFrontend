import React, { useState } from "react";
import {StyleSheet, Button, Keyboard} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import HomeScreen from "./src/pages/HomeScreen";
import SettingsScreen from "./src/pages/SettingsScreen";
import ProfileScreen from "./src/pages/ProfileScreen";
import FilterScreen from "./src/pages/FilterScreen";
import ChatScreen from "./src/pages/ChatScreen";
import MessagesScreen from "./src/pages/MessagesScreen";
import DetailsScreen from "./src/pages/DetailsScreen";
import StartScreen from "./src/pages/StartScreen";
import LogInScreen from "./src/pages/LogInScreen";
import SignUpScreen from "./src/pages/SignUpScreen";
import MatchScreen from "./src/pages/MatchScreen";
import SkillsScreen from "./src/pages/SkillsScreen";
const Stack = createNativeStackNavigator();

export default function App() {

    const [user, setUser] = useState(true);
    
    return (
        
        <RootSiblingParent>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: true}}>
                    {user ? (
                        <>
                            <Stack.Screen name="Home" component={HomeScreen} />
                            <Stack.Screen name="Match" component={MatchScreen} />
                            <Stack.Screen name="Settings" component={SettingsScreen} />
                            <Stack.Screen name="Profile" component={ProfileScreen} />
                            <Stack.Screen name="Filter" component={FilterScreen} />
                            <Stack.Screen name="Skills" component={SkillsScreen} />
                            <Stack.Screen name="Chat" component={ChatScreen} />
                            <Stack.Screen name="Messages" component={MessagesScreen} />
                            <Stack.Screen name="Details" component={DetailsScreen} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Start" component={StartScreen} options={{
                              headerShown: false
                            }}/>
                            <Stack.Screen name="LogIn" component={LogInScreen}/>
                            <Stack.Screen name="Registierung" component={SignUpScreen} options={({navigation,route}) => ({
                              headerRight: () => {
                                <Button title="Back" />
                              },
                              headerTransparent: true
                            })}/>
                            <Stack.Screen name="Details" component={DetailsScreen}/>
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </RootSiblingParent>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

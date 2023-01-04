// @ts-nocheck
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { appendChatMessageToChat } from "../../resources/ChatStore";
import { styles } from "../../resources/Styles";
import '../../resources/globals'

const ChatWrite = (props) => {
    const chatArray = props.chatArray
    const currentUser = props.currentUser

    const [message, setMessage] = React.useState("")
    const sendSymbol = "\u27A4"

    function createNewMessage() {
        if(message === ""){
            return
        }
        setMessage("")
        if(chatArray.messages.length > 0){
            global.appendMessageToChat(chatArray.chatID, message, chatArray.chatPartner.id, currentUser.id, chatArray)
        }else{
            global.appendMessageToChat(chatArray.chatID, message, chatArray.chatPartner.id, currentUser.id, chatArray)
        }
        
    }

    return (
        <View style={styles.ChatWriterField}>
            <TextInput style={styles.ChatWriterInputField} placeholder="Nachricht" value={message} onChangeText={setMessage} />
            <TouchableOpacity style={styles.ChatWriterSend} onPress={createNewMessage}>
                <Text style={styles.ChatWriterSendText}>{sendSymbol}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChatWrite
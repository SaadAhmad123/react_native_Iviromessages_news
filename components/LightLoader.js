import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Footer from './Footer';

export default class LightLoader extends React.Component{
    
    render(){
        return(
            <View style={[styles.container]}>
                <ActivityIndicator size="large" color="black"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        position:'relative',
        flex : 1,
        padding : 20,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
    }
});
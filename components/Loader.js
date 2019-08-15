import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Footer from './Footer';

export default class Loader extends React.Component{
    
    render(){
        return(
            <View style={[styles.container]}>
                <ActivityIndicator size="large" color="#e18a07"/>
                <Footer />
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
        backgroundColor:'black',
    }
});
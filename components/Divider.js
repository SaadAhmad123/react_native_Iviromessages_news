import React from "react";
import { View, StyleSheet } from "react-native";

export default class Divider extends React.Component{
    render(){
        return (
            <View style={{ flexDirection : 'row'}}>
                <View style={[{
                    height : 1,
                    backgroundColor : "#aaa",
                    flex : 1,
                }]} />
            </View>
        );
    }
}
import { View, StyleSheet, Text, Dimensions } from "react-native";
import React from 'react';

export default class Footer extends React.Component{
    
    render(){
        return (
            <View style={[ styles.footer ]}>
                <Text style={{ color:'#C0C0C0', letterSpacing:5, fontSize:7 }}>COPYRIGHT © 2019</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    footer : {
        position : 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        bottom: 0,
        width: Dimensions.get('window').width,
        padding:2,
        backgroundColor:'black',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    }
});
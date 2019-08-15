import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default class Banner extends React.Component{
    
    render(){
        return(
            <View style={[ styles.banner ]}>
                <Text style={{ color:'white', letterSpacing:2 }}>{this.props.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    banner : {
        position : 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        top: 30,
        padding:12,
        backgroundColor:'#e18a07EE',
        borderTopRightRadius:50,
        borderBottomRightRadius:50,
    },

});
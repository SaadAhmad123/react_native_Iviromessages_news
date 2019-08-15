import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight, Dimensions, ScrollView} from 'react-native';

export default class MenuItem extends React.Component{
    
    render(){
        return (
            <TouchableHighlight onPress={this.props.onPress} activeOpacity={0.6}>
                <Text style={[styles.menuItem, this.props.active ? styles.menuItemActive : null]}>
                    {this.props.title}
                </Text>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    menuItem : {
        fontSize:40,
        color:'#eee',
        letterSpacing:2,
        fontWeight:'bold',
    },

    menuItemActive : {
        color : '#e18a07',
    },
});
import React from 'react';
import {View, StyleSheet, Text, TouchableNativeFeedback, Dimensions, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MenuFAB extends React.Component{
    
    render(){
        return (
                <TouchableNativeFeedback
                    onPress = {this.props.onPress}
                >
                    <View style={[ styles.fab ]}>
                        <Icon
                            name={this.props.icon}
                            color={this.props.color !== undefined ? this.props.color : this.d_color}
                            size={this.props.size !== undefined ? this.props.size : this.d_size}
                        />
                    </View>
                </TouchableNativeFeedback>
        );
    }

    constructor(props){
        super(props);
        this.d_color = "#eee";
        this.d_size = 20;
    }
}

const styles = StyleSheet.create({
    fab : {
        position : 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor:'#e18a07',
        borderRadius:56,
    },
});
import React from 'react';
import {View, Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class NewsCardIcon extends React.Component{

    render(){
        return (
            <View style={{ flexDirection:'row', alignItems: 'center', marginRight:12 }}>
                <Icon
                    name={this.props.name}
                    size={this.props.fontSize}
                    color={this.props.color}
                    style={{ paddingRight:8}}
                />
                <Text style={{ fontSize:this.props.fontSize, color:this.props.color }}>
                    {this.props.text}
                </Text>
            </View>
        );
    }
}
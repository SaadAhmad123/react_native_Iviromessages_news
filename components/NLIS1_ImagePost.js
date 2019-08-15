import React from 'react';
import { View, Image, StyleSheet, Text, Dimensions, TouchableNativeFeedback, Alert } from 'react-native';
import Divider from './Divider';
import Utils from './Utils';
import { Actions } from 'react-native-router-flux';
import HTML from 'react-native-render-html';


export default class NLIS1_ImagePost extends React.Component{

    render(){
        return(
            <TouchableNativeFeedback onPress={() => {Actions.readMore({item : this.props.item})}}>
            <View>
                <Image 
                    source = {{uri : this.props.item.jetpack_featured_media_url}}
                    style={[styles.image]}
                />
                <View style={styles.container}>
                <HTML containerStyle={{ height : 56, marginBottom: 16, overflow:'hidden', }} html={this.props.item.title.rendered} baseFontStyle={styles.heading}/>
                    <Text style={[styles.dateText]}>{Utils.getFormatedDataString(new Date(this.props.item.date_gmt))} • Lire la suite</Text>
                    <Divider />
                </View>
            </View>
            </TouchableNativeFeedback>
        );
    }

    
}

const styles = StyleSheet.create({
    image : {
        width : Dimensions.get('window').width,
        height: 256,
        backgroundColor : "#212121"
    },
 
    container : {
        padding : 16,
    },

    heading : {
        fontSize : 22,
        fontWeight : 'bold',
        height : 56,
        color : "black",
        marginBottom : 16,
    },

    dateText : {
        fontSize : 12, 
        color : '#aaaaaa',
        marginBottom : 12,
    }

});
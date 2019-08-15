import React from 'react';
import { View, StyleSheet, Text, TouchableNativeFeedback, Alert } from 'react-native';
import Divider from './Divider';
import Utils from './Utils';
import { Actions } from 'react-native-router-flux';
import HTML from 'react-native-render-html';



export default class NLSI_postTextCard extends React.Component{
    
    render(){
        return(
            <View style={{ flex : 1 }}>
                <TouchableNativeFeedback  onPress={() => {Actions.readMore({item : this.props.item})}}>
                    <View style={[styles.container]}>
                        <HTML containerStyle={{ height : 90, marginBottom: 16, overflow:'hidden', }} html={this.props.item.title.rendered} baseFontStyle={styles.heading}/>
                        <Text style={[styles.dateText]}>{Utils.getFormatedDataString(new Date(this.props.item.date_gmt))} • Lire la suite</Text>
                        <Divider />
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 16,
        paddingTop : 0,
    },

    heading : {
        fontSize : 18,
        height : 90,
        marginBottom : 16,
        fontWeight : 'bold',
    },

    dateText : {
        fontSize : 12, 
        color : '#aaaaaa',
        marginBottom : 12,
    }
}); 
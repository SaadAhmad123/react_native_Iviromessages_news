import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableNativeFeedback } from 'react-native';
import HTML from 'react-native-render-html';
import Utils from './Utils';
import Divider from './Divider';
import { Actions } from 'react-native-router-flux';

export default class HomeNewsListItem extends React.Component{
    render(){
        return (
            <TouchableNativeFeedback onPress={() => {Actions.readMore({item : this.props.item})}}>
            <View style={{ paddingHorizontal: 16 ,marginBottom : 16, flexDirection:'row', alignItems:'center' }}>
                <Image
                    source = {{uri : this.props.item.jetpack_featured_media_url}}
                    style = {[styles.image]}
                />
                <View style={{ flex:1,height:104 }}>
                    <HTML containerStyle={{ height : 66, marginBottom: 8, overflow:'hidden', }} html={this.props.item.title.rendered} baseFontStyle={styles.heading}/>
                    <Text style={[styles.dateText]}>{Utils.getFormatedDataString(new Date(this.props.item.date_gmt))} • {this.state.cat_name}</Text>
                    <Divider />
                </View>
            </View>
            </TouchableNativeFeedback>
        );
    }

    constructor(props){
        super(props);
        this.state = {
            cat_name : "",
        };
    }

    async componentDidMount(){
        let inst = this;
        return fetch("https://ivoiremessages.com/wp-json/wp/v2/categories/" + this.props.item.categories[0])
            .then((resp) => resp.json())
            .then((respJson) => {
                inst.setState(previousState => (
                    {cat_name : respJson.name == "ACTUALITE" ? "Actualite" : respJson.name}
                ));
            })
            .catch((error) => console.error(error));
    }
}

const styles = StyleSheet.create({
    image : {
        height : 104,
        width : 104,
        backgroundColor : '#212121',
        marginRight : 16,
    },
    heading : {
        fontSize : 18,
        fontWeight : 'bold',
    },
    dateText : {
        fontSize : 12, 
        color : '#aaaaaa',
        marginBottom : 12,
    }
});
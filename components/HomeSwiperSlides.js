import React from 'react';
import {View, Image, Dimensions, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import Utils from './Utils';
import Divider from './Divider';
import HTML from 'react-native-render-html';
import { Actions } from 'react-native-router-flux';


export default class HomeSwiperSlides extends React.Component{
    render(){
        return(
            <TouchableNativeFeedback onPress={() => {Actions.readMore({item : this.props.item})}}>
                <View style={{ flex : 1}}>
                    <Image 
                        source={{ uri:this.props.item.jetpack_featured_media_url }}
                        style = {[styles.image]}
                    />
                    <View style={[styles.container]}>
                        <HTML containerStyle={{ height : 56, marginBottom: 16, overflow:'hidden', }} html={this.props.item.title.rendered} baseFontStyle={styles.heading}/>
                        <Text style={[styles.dateText]}>{Utils.getFormatedDataString(new Date(this.props.item.date_gmt))} • {this.state.cat_name}</Text>
                        <Divider />
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }

    constructor(props){
        super(props);
        this.state = {
            cat_name : '',
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
        width : Dimensions.get('window').width,
        height : 256,
        backgroundColor: '#212121',
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
        overflow:'hidden',
    },
    dateText : {
        fontSize : 12, 
        color : '#aaaaaa',
        marginBottom : 12,
    }
});
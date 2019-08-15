import React from 'react';
import {View, StyleSheet, Image, Text, Button, TouchableNativeFeedback, ImageBackground, Dimensions} from 'react-native';
import Utils from './Utils';
import { Actions } from 'react-native-router-flux';
import Footer from './Footer';

export default class SwiperSlide extends React.Component{

    render(){
        return (
            <View style={{ flex:1, position:'relative' }}>
                <Image 
                    source={this.props.image}
                    style = {[styles.image]}
                />
                <View style={[styles.contentContainer]}>
                    <Text style={[styles.heading]}>
                        {this.props.heading}
                    </Text> 
                    <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:16 }}>
                        <Text style={[styles.dateText]}>{Utils.getFormatedDataString(new Date(this.props.date))} {this.state.cat_name.length > 0 ? "•" : ""} {this.state.cat_name}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection:'row',alignItems:'flex-start', justifyContent:'flex-start', marginTop:16}}>
                        <TouchableNativeFeedback onPress={() => {Actions.readMore({item : this.props.item})}}>
                            <View style={[styles.readMoreButton]}>
                                <Text style={{ fontSize:16,color:'#eee',letterSpacing:2  }}>
                                    LIRE L'ARTICLE
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <Footer />
            </View>
        );
    }

    constructor(props){
        super(props);
        this.state = {
            cat_name : "",
        };
    }

    componentDidMount(){
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
        flex:1,
        width : Dimensions.get('window').width,
    },
    contentContainer : {
        flex:1,
        padding: 16,
        backgroundColor: '#000',
    },
    heading : {
        fontSize: 40,
        fontWeight : '600',
        color: 'white',
        height:150,
    },
    readMoreButton : {
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: '#e18a07',
        borderRadius:4,
        flexDirection:'row',
        alignItems: 'center'
    },
    dateText : {
        fontSize : 12, 
        color : '#c0c0c0',
    }
});












/**
 * 
 * <NewsCardIcon name='eye' text={12} color='#ccc' fontSize={16}/>
                        <NewsCardIcon name='comments' text={12} color='#ccc' fontSize={16}/>
                        <NewsCardIcon name='share-alt' text={12} color='#ccc' fontSize={16}/>
 * 
 */

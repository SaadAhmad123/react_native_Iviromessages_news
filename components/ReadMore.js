import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Dimensions, Linking} from 'react-native';
import Divider from './Divider';
import Utils from './Utils';
import Menu from './Menu';
import HTML from 'react-native-render-html';
import {AdMobBanner} from 'expo';


export default class ReadMore extends React.Component{

    render(){
        return (
            <View style={{ backgroundColor : "white", flex : 1 }}>
                <ScrollView>
                    <Image 
                        source = {{uri : this.props.item.jetpack_featured_media_url}}
                        style={[styles.image]}
                    />
                    <View style={[styles.container]}>
                    <HTML containerStyle={{ marginBottom: 16 }} html={this.props.item.title.rendered} baseFontStyle={styles.heading}/>
                    <Text style={[styles.dateText]}>{Utils.getFormatedDataString(new Date(this.props.item.date_gmt))} • {this.state.cat_name}</Text>
                        <Divider />
                        <View style={{ marginBottom : 16 }}></View>
                        <Text style={{ fontSize: 18, fontWeight:'bold'}}>Résumé</Text>
                        <HTML   textSelectable={true}
                                html={this.props.item.excerpt.rendered}
                                imagesMaxWidth={Dimensions.get('window').width - 32} 
                                onLinkPress={(event, href) => {Linking.openURL(href)}}/>
                                <AdMobBanner
                                    bannerSize="smartBannerLandscape"
                                    adUnitID="ca-app-pub-5893007705317053/1637633734"
                                    onDidFailToReceiveAdWithError={(e) => {console.log(e)}} />
                        <Divider />
                        <View style={{ marginBottom : 16 }}></View>
                        <Text style={{ fontSize: 18, fontWeight:'bold'}}>Article</Text>
                        <HTML   textSelectable={true}
                                html={this.props.item.content.rendered}
                                imagesMaxWidth={Dimensions.get('window').width - 32} 
                                onLinkPress={(event, href) => {Linking.openURL(href)}}></HTML>
                    </View>
                </ScrollView>
                <Menu currentScene={{ id : 2, cat_id : null }}/>
            </View>
        );
    }

    constructor(props){
        super(props);
        this.state = {
            cat_name : ''
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
        height: 256,
        backgroundColor : "#212121"
    },
    container : {
        padding: 16,
    },
    heading : {
        fontSize : 24,
        fontWeight : 'bold',
        color : "black",
        marginBottom : 16,
    },
    dateText : {
        fontSize : 12, 
        color : '#aaaaaa',
        marginBottom : 12,
    }
});
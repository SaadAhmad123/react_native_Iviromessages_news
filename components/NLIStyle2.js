import React from 'react';
import { View, StyleSheet, Text, Image, TouchableNativeFeedback, Alert } from 'react-native';
import Divider from './Divider';
import Utils from './Utils';
import { Actions } from 'react-native-router-flux';
import HTML from 'react-native-render-html';
import {AdMobBanner} from 'expo';


export default class NLIStyle2 extends React.Component{
    render(){
        
        let inst = this;
        let imagesRow = this.props.item.map((item, index) => {
            return <Image 
                        key = {index}
                        style = {{ flex: 1, height: 96, backgroundColor : "#212121" }}
                        source = {{ uri : item.jetpack_featured_media_url }}
                    />
        });

        let newsText = this.props.item.map((item, index) => {
            return <View key={index}>
                <TouchableNativeFeedback  onPress={() => {Actions.readMore({item : item})}}>      
                    <View key={index} style={styles.container}>
                    <HTML containerStyle={{ height : 56, marginBottom: 16, overflow:'hidden', }} html={item.title.rendered} baseFontStyle={styles.heading}/>
                        <Text style={[styles.dateText]}>{Utils.getFormatedDataString(new Date(item.date_gmt))} • Lire la suite</Text>
                        <Divider />
                    </View> 
                </TouchableNativeFeedback>
            </View>
        });

        return(
            <View>
                {
                    (this.props.index != 0 && this.props.index % 4 == 1) ? 
                        <AdMobBanner
                            bannerSize="smartBannerLandscape"
                            adUnitID="ca-app-pub-5893007705317053/1637633734"
                            onDidFailToReceiveAdWithError={(e) => {console.log(e)}} />
                    : null
                }
                <View style={{ flexDirection : 'row' }}>
                    {imagesRow}
                </View>  
                <View style={{ paddingVertical : 16 }}>
                    {newsText}
                </View>             
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    container : {
        marginBottom : 16,
        paddingHorizontal : 16
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


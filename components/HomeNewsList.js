import React from 'react';
import {View,Text ,  StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import HomeNewsListItem from './HomeNewsListItem';
import {AdMobBanner} from 'expo';

export default class HomeNewsList extends React.Component{
    render(){
        return (
            <View style={{ paddingVertical : 16 }}>
                <FlatList
                    data = {this.props.data}
                    keyExtractor={(item, index) => "key" + index}
                    renderItem = {({item, index}) => {
                        if(index != 0 && index % 12 == 0){
                            return (
                            <View>
                                <HomeNewsListItem item={item} index={index}/>
                                <AdMobBanner
                                    bannerSize="smartBannerLandscape"
                                    adUnitID="ca-app-pub-5893007705317053/1637633734"
                                    onDidFailToReceiveAdWithError={(e) => {console.log(e)}} />
                                <View style={{ marginBottom:16 }}/>
                                {this.loader(index)}
                            </View>);
                        }
                        else{
                            return (
                            <View>
                                <HomeNewsListItem item={item} index={index}/>
                                {this.loader(index)}
                            </View>);
                        }}}
                />
            </View>
        );
    }

    loader(index){
        if(index + 1 == this.props.data.length)
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 8}}>
                    <ActivityIndicator color="#545454"/>
                </View>
            );
        else return null
    }

    constructor(props){
        super(props);
    } 
}
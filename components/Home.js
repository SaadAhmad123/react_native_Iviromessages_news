import React from 'react';
import { View, ScrollView, FlatList, Text, StyleSheet, RefreshControl, AsyncStorage } from 'react-native';
import Menu from './Menu';
import Loader from './Loader';
import Banner from './Banner';
import { Cache } from "react-native-cache";
import HomeSwiper from './HomeSwiper';
import HomeNewsList from './HomeNewsList';
import {AdMobBanner} from 'expo';

export default class Home extends React.Component{
    render(){
        // Check if scroll view is close to bottom
        const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
            const paddingToBottom = 20;
            return layoutMeasurement.height + contentOffset.y >=
              contentSize.height - paddingToBottom;
        };
        let dataList = Array.from(this.state.data);
        if (this.state.data.length < 1) return <Loader />;
        else return (
            <View style={{ flex: 1, backgroundColor:'white' }}>
                <ScrollView
                    onScroll={({nativeEvent}) => {
                        if (isCloseToBottom(nativeEvent)) {
                            this.setState(previousState => ({endReached : true}));
                            this.fetchData();
                        }else{
                            this.setState(previousState => ({endReached : false}));
                        }
                    }}
                    scrollEventThrottle={400}
                    refreshControl={
                        <RefreshControl 
                            refreshing = {this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                >
                    <View>
                        <HomeSwiper data={dataList.splice(0,6)} slides={6}/>
                    </View>
                    <AdMobBanner
                        bannerSize="smartBannerLandscape"
                        adUnitID="ca-app-pub-5893007705317053/1637633734"
                        onDidFailToReceiveAdWithError={(e) => {console.log(e)}} />
                    <View style={{ paddingHorizontal : 14}}>
                        <Text style={{ fontWeight:'bold', fontSize : 42, color:'black', letterSpacing : 2 }}>Explorer</Text>
                    </View>
                    <View>
                        <HomeNewsList data={dataList}/>
                    </View>
                </ScrollView>
                <Banner text="DERNIÈRES"/>
                <Menu currentScene={{ id : -1, cat_id : null }} show_drawer={false}/>
            </View>
        );
    }

    constructor(props){
        super(props);
        this.state = {
            data : [],
            loadingData : false,
            per_page : 12,
            page : 1,
            endReached : false,
            refreshing : false,
            cacheUpdated : false,
            fetchedFromCache : false,
        };
        this.URL = 'https://ivoiremessages.com/wp-json/wp/v2/posts?';
        this.cache = new Cache({
            namespace : "ivioremessages",
            policy : {
                maxEntries : 50000,
            },
            backend : AsyncStorage,
        });
    }


    componentDidMount(){
        let inst = this;
        inst.cache.peekItem('home', function(err, value){
            if(value){
                inst.setState(previousState => ({
                    data : value,
                    fetchedFromCache : true,
                }));
            }
        });
        return this.fetchData();
    }

    onRefresh(){
        if(this.state.loadingData){
            this.setState(previousState => ({refreshing:false}));
            return;
        } else this.setState(previousState => ({refreshing:true, data:[], page:1, cacheUpdated:false}), () => {
            this.fetchData();
        });
    }

    async fetchData(){
        let inst = this;
        if(inst.state.loadingData) return;
        inst.setState(previousState => ({loadingData : true}));
        return fetch(inst.URL + 'per_page=' + this.state.per_page + "&page=" + this.state.page)
        .then((resp) => resp.json())
        .then((respJson) => {
            if(respJson.data && respJson.data.status) {console.error(respJson.data.status); return;}
            if(!inst.state.loadingData) return;
            inst.setState(previousState => ({
                data : inst.state.fetchedFromCache ? respJson : [...inst.state.data, ...respJson],
                page : previousState.page + 1,
                loadingData : false,
                refreshing : false,
                fetchedFromCache : false,
            }));
            if(!this.state.cacheUpdated){
                inst.cache.setItem('home', inst.state.data, function(error){if(error)console.error(error)});
                inst.setState(previousState => ({cacheUpdated : true}));
            }
        })
        .catch((error) => console.error(error));
    }
}


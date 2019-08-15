import React from 'react';
import {StyleSheet,FlatList, ScrollView, Text, View, Dimensions, ActivityIndicator, AsyncStorage, RefreshControl} from 'react-native';
import Menu from '../Menu';
import HomeSwiper from '../HomeSwiper';
import Loader from '../Loader';
import Banner from '../Banner';
import NewsListItem from '../NewsListItem';
import HomeSwiperNewsList from '../HomeSwiperNewsList';

export default class Home extends React.Component{

    render(){
        
        const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
            const paddingToBottom = 20;
            return layoutMeasurement.height + contentOffset.y >=
              contentSize.height - paddingToBottom;
        };

        if (this.state.slidesData.length < 1) return (<Loader />);
        else return(
            <View>
                <ScrollView
                    onScroll={({nativeEvent}) => {
                        if (isCloseToBottom(nativeEvent)) {
                            this.setState(previousState => ({endReached : true}));
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
                    style={{ position:'relative' }}
                    
                >
                    <HomeSwiper slides = {this.state.slidesData} refreshing = {this.state.refreshing}/>
                    <HomeSwiperNewsList endReached={this.state.endReached} refreshing={this.state.refreshing} />
                </ScrollView>
                <Menu currentScene={{ id : -1, cat_id : null }}/>
                <Banner text="DERNIÈRES"/>
            </View>
        );
    }

    


    constructor(props){
        super(props);
        this.cache = new Cache({
            namespace : 'myapp',
            policy: {
                maxEntries: 50000
            },
            backend: AsyncStorage
        })

        this.state = {
            posts : [],
            slidesData : [],
            postLimit : 6,
            refreshing : false,
            loadingData : false,
            endReached : false
        };
    }

    componentDidMount(){
        let inst = this;
        this.newCache = true;

        this.cache.peekItem('home', function(err,value){
            if(value){
                inst.setState(previousState => (
                    {slidesData : value}
                ));
                inst.newCache = false;
            }
        })

        return this.loadData();
    }  


    


    groupArr = (arr, size) => {
        let testArr = [];
        const createGroup = (arr, size) => {
            // base case
            if (arr.length <= size) {
                testArr.push({
                    key : "" + this.state.data.length + testArr.length + "",
                    data : arr,
                });
            } else {
                let group = arr.slice(0, size);
                let remainder = arr.slice(size);
                testArr.push({
                    key : "" + this.state.data.length + testArr.length + "",
                    data : group,
                });
                createGroup(remainder, size);
            }
        }
        createGroup(arr, size);
        return testArr;
    }









    async loadData(){
        this.setState(previousState => ({loadingData:true}));
        let inst = this;
        return fetch('https://ivoiremessages.com/wp-json/wp/v2/posts?per_page=' + this.state.postLimit)
            .then((resp) => resp.json())
            .then((respJson) => {
                
                let data = [];
                // formating the slides data
                respJson.forEach(element => {
                    data.push({
                        image : element.jetpack_featured_media_url,
                        heading : element.title.rendered,
                        date : element.date_gmt,
                        id : element.id,
                        item : element,
                    });
                });
                if(!inst.newCache)inst.cache.removeItem('home', function(error){ if(error) console.log(error); });
                inst.cache.setItem('home', data, function(error){ if(error) console.log(error); });
                inst.setState(previousState => (
                    {slidesData : data, refreshing:false, loadingData:false}
                ));

                


            })
            .catch((error) => {
                console.error(error);
            });
    }

    onRefresh(){
        this.setState(previousState => ({refreshing:true}))
        this.loadData();
    }
    
}


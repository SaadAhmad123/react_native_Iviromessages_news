import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, ActivityIndicator, RefreshControl } from 'react-native';
import NewsListItem from './NewsListItem';
import Menu from './Menu';
import LightLoader from './LightLoader';
import Banner from './Banner';

export default class NewsList extends React.Component{
    render(){
        if(this.state.data.length < 1) return <LightLoader />
        else return (
            <View style={{  flex:1, position:'relative', backgroundColor:'white'}}>
                <View  style={[styles.container]}>
                    <FlatList
                        refreshControl={
                            <RefreshControl 
                                refreshing = {this.state.refreshing}
                                onRefresh = {this.onRefresh.bind(this)}
                            />
                        }
                        onEndReachedThreshold = {0.5}
                        onEndReached = {this.loadNextData.bind(this)}
                        data = {this.state.data}
                        renderItem = {({item, index}) => <View>
                                <NewsListItem item={item.data} index={index}/>
                                {this.loader(index)}
                            </View>
                            }
                    />
                </View>
                <Menu currentScene={{ id : 1, cat_id : this.props.cat_id }}/>
            </View>
        );
    }

    loader(index){
        if(index + 1 == this.state.data.length && Math.ceil(this.props.post_count / 3) > this.state.data.length)
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 28}}>
                    <ActivityIndicator color="#545454"/>
                </View>
            );
        else return null
    }


    constructor(props){
        super(props);
        this.state = {
            data : [],
            page : 1,
            per_page : 6,
            loadingData : false,
            refreshing : false,
        };
    }

    componentDidMount(){
        return this.fetchNewsData();
    }

    // Utile functions
    onRefresh(){
        let inst = this
        this.setState(previousState => ({data:[], page:1}), () => {
            inst.fetchNewsData(true)
        });
    }

    loadNextData(distFromEnd){
        if(this.state.data.length < 1) return;
        this.fetchNewsData();
    }

    async fetchNewsData(refresh = false){
        if(this.state.loadingData) return;
        if(Math.ceil(this.props.post_count / 3) <= this.state.data.length) return;
        let inst = this;
        inst.setState(previousState => ({loadingData:true}));
        return fetch("https://ivoiremessages.com/wp-json/wp/v2/posts?categories="+this.props.cat_id+"&per_page="+this.state.per_page+"&page=" + (refresh ? "1" : this.state.page))
        .then((resp) => resp.json())
        .then((respJson) => {
            if(respJson.data && respJson.data.status) {console.error(respJson.data.status); return;}
            if(!inst.state.loadingData) return;
            let data = inst.groupArr(respJson, 3);
            inst.setState(previousState => (
                {data : [...inst.state.data, ...data]}
            ));
            inst.setState(previousState => ({page : previousState.page + 1}));
            inst.setState(previousState => ({loadingData:false}));
        })
        .catch((error) => console.error(error));
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
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    }
});
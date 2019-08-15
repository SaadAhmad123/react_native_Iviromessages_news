import React from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import NewsListItem from './NewsListItem';

export default class HomeSwiperNewsList extends React.Component{

    render(){
        if(this.state.data.length < 1) return <View style={{ paddingTop:32 }}>{this.loader(-1)}</View>;
        return (
            <View style={{ flex : 1, position:'relative' }}>
                <FlatList 
                    nestedScrollEnabled = {true}
                    style = {{ flex : 1 }}
                    data = {this.state.data}
                    renderItem = {({item, index}) => <View>
                                <NewsListItem item={item.data} index={index}/>
                                {this.loader(index)}
                            </View>
                            }
                />
            </View>
        );
    }

    loader(index){
        if(index + 1 == this.state.data.length)
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
            page : 2,
            per_page : 6,
            loadingData : false,
        };
    }

    loadNextData(distFromEnd){
        this.fetchNewsData();
    }

    componentDidMount(){
        return this.fetchNewsData(this.props.refreshing);
    }

    componentDidUpdate(){
        if(this.props.refreshing && this.state.data.length > 0) {
            this.setState(previousState => ({data : [], page : 2}));
            return this.fetchNewsData(this.props.refreshing);
        }
        else if (this.props.endReached && this.state.data.length > 0) return this.loadNextData();
    }

    async fetchNewsData(refresh = false){
        if(this.state.loadingData) return;
        if(Math.ceil(this.props.post_count / 3) <= this.state.data.length) return;
        let inst = this;
        inst.setState(previousState => ({loadingData:true}));
        return fetch("https://ivoiremessages.com/wp-json/wp/v2/posts?"+"per_page="+this.state.per_page+"&page=" + (refresh ? "2" : this.state.page))
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
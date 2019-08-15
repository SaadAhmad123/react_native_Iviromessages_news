import React from 'react';
import {View, StyleSheet,Alert, ScrollView, AsyncStorage} from 'react-native';
import MenuItem from './MenuItem';
import {Actions} from 'react-native-router-flux';
import Loader from './Loader';
import { Cache } from 'react-native-cache';

export default class MenuList extends React.Component{
    
    render(){
        var menuItems = this.state.menu.map((item, index) => {
            return (
                <MenuItem 
                    key = {index}
                    title={item.title}
                    active={this.props.currentScene.id == item.id && this.props.currentScene.cat_id == item.cat_id}
                    onPress={()=>{
                        this.props.hideDrawer();
                        // If the clicked item ID is -1 (home) and the current scene is not the (home) then go to home
                        if( item.id == -1 && this.props.currentScene.id != item.id ) Actions.popTo("home");
                        // If the clicked item ID is 1 (NewsList) and the requested cat_id is not the current cat_id
                        else if (item.id == 1  && this.props.currentScene.cat_id != item.cat_id){
                            Actions.newsList({cat_id : item.cat_id, title : item.title, post_count:item.count})
                        }
                    }}/>
            );
        });

        if(this.state.menu.length < 1) return (<Loader />);
        else return (
            <ScrollView style={{ padding:16 }}>
                <View style={{ height:80 }}></View>
                    {menuItems}
                <View style={{ height:40 }}></View>
            </ScrollView>
        );
    }

    constructor(props){
        super(props);
        this.cache = new Cache({
            namespace : "ivioremessages",
            policy: {
                maxEntries: 50000
            },
            backend: AsyncStorage
        });
        this.state = {
            menu : [],
        };
    }

    componentDidMount(){
        this.newCache = true;
        let inst = this;
        this.cache.peekItem('menu', function(error, value){
            if(value){
                inst.setState(previousState =>(
                    {menu : value}
                ));
                inst.newCache = false;
            }
        })

        return fetch("https://ivoiremessages.com/wp-json/wp/v2/categories?per_page=100&page=1")
            .then((resp) => resp.json())
            .then((resp) => {
                let data = [
                    {
                        title : 'Dernières',
                        id : -1,    // Home Scene ID
                        cat_id: null,
                        count : null, 
                    },
                ];
                
                resp.forEach(element => {
                    data.push({
                        title : element.name == 'ACTUALITE' ? 'Actualite' : element.name,
                        id : 1,     // Category Scene ID
                        cat_id : element.id,    // Category ID
                        count : element.count,
                    });
                });

                if(!inst.newCache) inst.cache.removeItem('menu', function(error){ if(error) console.log(error)})
                inst.cache.setItem('menu', data, function(error){ if(error) console.log(error)})

                this.setState(previousState => (
                    {menu : data}
                ));

                
                
            })
            .catch((error) => console.error(error));
    }
}

const styles = StyleSheet.create({
    menuItem : {
        fontSize:40,
        color:'#e18a07',
        letterSpacing:2,
        fontWeight:'bold',
    },

    menuItemActive : {
        color : 'red',
    },
});
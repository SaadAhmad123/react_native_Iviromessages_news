import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MenuFAB from './MenuFAB';
import MenuList from './MenuList';


export default class Menu extends React.Component{
    
    render(){
        return(
            <View>
                <MenuFAB icon="bars" onPress = {this.showDrawer}/>
                <View style={[styles.drawer, !this.state.show_drawer? styles.hide : null]}>
                    <View style={{ position:'relative', flex:1 }}>
                        <MenuList hideDrawer={this.hideDrawer} currentScene={this.props.currentScene}/>
                        <MenuFAB icon="times"
                            onPress = {this.hideDrawer}/>
                    </View>
                    
                </View>
            </View>
        );
    }

    constructor(props){
        super(props);
        this.state = {
            show_drawer : this.props.show != null ? this.props.show : false,
        }

        this.showDrawer = this._showDrawer.bind(this);
        this.hideDrawer = this._hideDrawer.bind(this);
    }

    _showDrawer(){
        this.setState(previousState => (
            {show_drawer : true}
        ));
    }

    _hideDrawer(){
        this.setState(previousState => (
            {show_drawer : false}
        ));
    }

}

const styles = StyleSheet.create({
    drawer : {
        position : 'absolute',
        right: 0,
        bottom: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor:'#000000EE',
        zIndex:3,
    },

    hide : {
        bottom : -1 * Dimensions.get('window').height,
    }
}); 
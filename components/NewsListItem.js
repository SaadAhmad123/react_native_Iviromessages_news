import React from 'react';
import NLIStyle1 from './NLIStyle1';
import NLIStyle2 from './NLIStyle2';
import {View, Text} from 'react-native';

export default class NewsListItem extends React.Component{
    render(){
        if(this.props.index % 2 == 0) return <NLIStyle1 item={this.props.item} index={this.props.index}/>
        else if(this.props.index % 2 == 1) return <NLIStyle2 item={this.props.item} index={this.props.index}/>
        else return null;
    }
}


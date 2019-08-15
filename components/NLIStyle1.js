import React from 'react';
import NLIS1_ImagePost from './NLIS1_ImagePost';
import { View } from 'react-native';
import NLSI_postTextCard from './NLIS1_postTextCard';

export default class NLIStyle1 extends React.Component{
    // This component shows the new of three items as:
    // - One big imaged post
    // - Two in-row text posts
    render(){
        return(
            <View>
                {this.imagePost()}
                {this.postRow()}
            </View>
        );
    }

    imagePost(){
        if(this.props.item.length > 0) return( <NLIS1_ImagePost item={this.props.item[0]}/>)
        else return null;
    }

    postRow(){
        if(this.props.item.length > 1){
            return (
                <View style={{ flexDirection:'row' }}>
                    {this.postTextCard(1)}
                    {this.postTextCard(2)}
                </View>
            )
        }else return null
    }

    postTextCard(itemNumber){
        if(this.props.item.length > itemNumber) return <NLSI_postTextCard item={this.props.item[itemNumber]} />
        else return null;
    }

    constructor(props){
        super(props);
    }

}
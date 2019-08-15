import React from 'react';
import {View, ScrollView, Dimensions} from 'react-native'
import Swiper from 'react-native-swiper';
import { Text } from 'react-native';
import HomeSwiperSlides from './HomeSwiperSlides';

export default class Home extends React.Component{
    render(){
        var slidesData = this.props.data.length <= this.props.slides ? this.props.data : this.props.data.slice(0,this.props.slides);
        const slides = slidesData.map((item, index) => {
            return  <HomeSwiperSlides 
                        key = {index}
                        item = {item}
                    />;
        });


        return (
            <ScrollView>
                <Swiper
                    activeDotColor="#e18a07"
                    dotColor="black" 
                    style={{ width:Dimensions.get('window').width, height:428}}
                    >
                    {slides}
                </Swiper>
            </ScrollView>
        );
    }

    constructor(props){
        super(props);
    }
}

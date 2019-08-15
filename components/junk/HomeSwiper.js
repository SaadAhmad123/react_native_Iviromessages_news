import React from 'react';
import Swiper from 'react-native-swiper';
import SwiperSlide from './SwiperSlide';
import {Dimensions, View} from 'react-native';
import HomeSwiperNewsList from './HomeSwiperNewsList';

export default class HomeSwiper extends React.Component{

    render(){
        var slidesData = this.props.slides.length <= this.state.limit ? this.props.slides : this.props.slides.slice(0,this.state.limit);
        var slides = slidesData.map((item, index) => {
            return <SwiperSlide 
                        key = {index}
                        image={{ uri : item.image }}
                        heading={item.heading}
                        date={item.date}
                        item={item.item}
                    />;
        });
        

        return(
            <Swiper 
                    activeDotColor="#e18a07"
                    dotColor="#C0C0C0" 
                    style={{ width:Dimensions.get('window').width, height:Dimensions.get('window').height }}
            >
                {slides}
            </Swiper>
        );
    }

    constructor(props){
        super(props);
        this.state = {
            limit : 6,
        };
    }
}

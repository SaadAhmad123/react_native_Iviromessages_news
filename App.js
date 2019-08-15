import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Home from './components/Home';
import NewsList from './components/NewsList';
import { StyleSheet } from 'react-native';
import ReadMore from './components/ReadMore';


export default class App extends React.Component {
  render() {
    return (
      <Router
        navigationBarStyle={[styles.navbar]}
        titleStyle={{ color : 'white', fontWeight:'400', letterSpacing:3, fontSize: 16 }}
        tintColor='white'
        navBarTintColor='white'
        navBarButtonImageColor='white'
      >
        <Stack key="root">
          <Scene key="home" component={Home} title="Ivioremessages News" initial={true} hideNavBar={false}/>
          <Scene key="newsList" component={NewsList} title={this.props.title} hideNavBar={false}/>
          <Scene key="readMore" component={ReadMore} title="Lire l'Article" hideNavBar={false}/>
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  navbar : {
    backgroundColor : 'black',
    color : 'white',
  },
});
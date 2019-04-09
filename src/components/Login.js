import { Font, Constants  } from 'expo';
import React from 'react';
import {
  WebView
} from 'react-native';
import {
    Container,
    Content,
    Button,
    Text,
    Form,
    Item,
    Input,
    Label,
    Badge,
    View,
} from 'native-base';
import {
    Linking,
    WebBrowser
} from 'expo';
import {
  CustomHeader,
  CustomSpinner
} from './src/components/common'
import firebase from 'firebase';
const captchaUrl = `https://phone-login-536c9.firebaseapp.com/captcha.html?appurl=${Linking.makeUrl('')}`;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      phoneNumber: '+91',
      message:null
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf') 
    });
    this.setState({ loading: false });
      const config = {
        apiKey: "AIzaSyB5OTFxrmsLItoxP6ISO9gxTtjcSN9FlXQ",
        authDomain: "phone-login-536c9.firebaseapp.com",
        databaseURL: "https://phone-login-536c9.firebaseio.com",
        projectId: "phone-login-536c9",
        storageBucket: "phone-login-536c9.appspot.com",
        messagingSenderId: "305382960164"
      };
          firebase.initializeApp(config);

  }

    render() {
        if (this.state.loading) {
            return (
                <CustomSpinner />
            );
        }
        return (<Container>aa</Container>);

}
}
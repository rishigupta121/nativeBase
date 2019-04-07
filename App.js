import { Font, Constants  } from 'expo';
import React from 'react';
import {
  WebView
} from 'react-native';
import { Container,
   Content, Button,
    Text, Form, Item, Input, Label, Badge,
    View,
    } from 'native-base';
    import {
      Linking,
      WebBrowser
    } from 'expo'
import {
  CustomHeader,
  CustomSpinner
} from './src/components/common'
import firebase from 'firebase';
const captchaUrl = `https://phone-login-536c9.firebaseapp.com/captcha.html?appurl=${Linking.makeUrl('')}`;

export default class App extends React.Component {
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
  onButtonPress = async () => {
             let token = null
             const listener = ({
               url
             }) => {
               WebBrowser.dismissBrowser()
               const tokenEncoded = Linking.parse(url).queryParams['token']
               if (tokenEncoded)
                 token = decodeURIComponent(tokenEncoded)
             }
             Linking.addEventListener('url', listener)
             await WebBrowser.openBrowserAsync(captchaUrl)
             Linking.removeEventListener('url', listener)
             if (token) {
               const {
                 phone
               } = this.state
               //fake firebase.auth.ApplicationVerifier
               const captchaVerifier = {
                 type: 'recaptcha',
                 verify: () => Promise.resolve(token)
               }
               try {
                 const confirmationResult = await firebase.auth().signInWithPhoneNumber('+918923569047', captchaVerifier)
                 this.setState({
                   confirmationResult
                 })
               } catch (e) {
                 console.warn(e)
               }

             }
           
  }

     onPhoneChange = (phone) => {
       this.setState({
         phone
       })
     }
  render() {
    if (this.state.loading) {
      return (
        <CustomSpinner />
      );
    }
    return (
      <Container style={{ paddingTop: Constants.statusBarHeight }}>
        <CustomHeader headerText = "Login" />
      <Content padder>
        <Form>
            <Item floatingLabel>
              <Label>Phone No</Label>
              < Input/>
            </Item>
            <Item floatingLabel last>
              <Label>code</Label>
              <Input />
            </Item>
            <View style={styles.loginButtonSection}>
            <Button ref="sign-in-button" primary onPress={this.onButtonPress.bind(this)}><Text>Sign In </Text></Button>
            </View>
          </Form>
          < WebView source = {
            {
              html: '<div id="recaptcha-container"></div>'
            }
          }
          />
        </Content>
    </Container>
    );
  }
}

const styles= {
  headerStyle: {
    flexDirection: 'row',
    // alignContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
  },
  centerBlock: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  loginButtonSection: {
    flexDirection: "row",
    justifyContent: 'center',
    paddingTop:10
 },
 spinnerStyle:{
  flexDirection: 'column',
   alignItems: 'center'
 }
}


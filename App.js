
import { Font, Constants  } from 'expo';
import React from 'react';
import { Container, Header, Title,
   Content, Footer, FooterTab, Button, Right, Body, Icon,
    Text, Form,Spinner, Item, Input, Label, Badge,
    View,
    Left
    } from 'native-base';
    import firebase from 'firebase';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf') 
    });
    this.setState({ loading: false });
  }
  var phoneNumber = getPhoneNumberFromUserInput();
var appVerifier = window.recaptchaVerifier;
firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
    }).catch(function (error) {
      // Error; SMS not sent
      // ...
    });
  render() {
    if (this.state.loading) {
      return (
        <Container style={{ paddingTop: Constants.statusBarHeight }}>
           <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
           <Spinner color='blue' />
           </Content>
        </Container>
      );
    }
    return (
      <Container style={{ paddingTop: Constants.statusBarHeight }}>
      <Header style={styles.headerStyle}>
      <Left style={{flex:1}}/>
        <Body>
          <Title style={{flex:1, paddingTop:10 }}>Login</Title>
        </Body>
        <Right style={{flex:1}}/>
      </Header>
      <Content padder>
        <Form>
            <Item floatingLabel>
              <Label>Phone No</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>code</Label>
              <Input />
            </Item>
            <View style={styles.loginButtonSection}>
            <Button primary onPress={() => alert("This is Card Header")}><Text>Sign In </Text></Button>
            </View>
          </Form>
        </Content>
      <Footer>
        <FooterTab>
        <Button badge vertical>
              <Badge><Text>2</Text></Badge>
              <Icon name="apps" />
              <Text>Apps</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button active badge vertical>
              <Badge ><Text>51</Text></Badge>
              <Icon active name="navigate" />
              <Text>Navigate</Text>
            </Button>
            <Button vertical>
              <Icon name="person" />
              <Text>Contact</Text>
            </Button>
        </FooterTab>
      </Footer>
    </Container>
    );
  }
}

const styles= {
  headerStyle: {
    alignContent: 'center',
    alignItems: 'center',
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


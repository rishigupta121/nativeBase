import React from 'react';
  import {
      Constants
  } from 'expo';
import {
    Spinner,
    Container,
    Content
    } from 'native-base';
const CustomSpinner = () => {
return (
    <Container style={{ paddingTop: Constants.statusBarHeight }}>
        <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
            <Spinner color='blue' />
        </Content>
    </Container>
);
}


export {CustomSpinner};
import React from 'react';
import {
    Header,
    Title,
    Body,
    View,
} from 'native-base';


const CustomHeader = (props) => {
return(
    <Header>
        <Body>
            <View style={styles.headerStyle}>
                <Title>{props.headerText}</Title>
            </View>
        </Body>
    </Header>
);
}

const styles = {
        headerStyle: {
            flexDirection: 'row',
            alignSelf: 'center',
        }
    }

export {CustomHeader};
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import SearcherView from './SearcherView.js';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default class Home extends React.Component
{
    textstyle = StyleSheet.create({
        color: 0,
        fontSize: 14
    }
    );
    //a

    viewstyle = StyleSheet.create({
        borderWidth: 2,
        borderColor: 0
    });

    switchToShowList = (stationCode) =>
    {
        this.props.navigation.navigate('listScreen', {
            stationId: stationCode
        });
    }

    render()
    {
        return (
            <View style={this.viewstyle}>
                <Text >Search a stop to begin: </Text>
                <SearcherView srcLocation={"https://www.cvag.de/eza/mis/stations?like="} nextAction={this.switchToShowList} />
            </View>
        );
    }
}
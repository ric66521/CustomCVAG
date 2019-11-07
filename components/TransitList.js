import React from 'react';
import {FlatList, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';

class ListItem extends React.Component
{

    selectThumbnail = () => 
    {
        switch(this.props.data.serviceType)
        {
            case 'BUS': 
                return require('../img/Stadtbus.gif');
            case 'CHEMNITZBAHN':
                return require('../img/chemnitzbahn.gif');
            case 'TRAM': 
                return require('../img/Tram.gif');
        }
    }

    showTime = () => 
    {
        const departTimeObj = new Date(this.props.data.actualDeparture);
        /*
        if (this.props.data.hasActualDeparture)
        {
            const actualTime = new Date();
            const diffTime = actualTime - departTimeObj;
            return diffTime
            /*
            if (diffTime < 60000)
                return 'Now';
            else if (diffTime / 60000 < 2)
                return (diffTime / 60000) + ' Min';
            else
                return (diffTime / 60000) + ' Mins';
                
        }
        else
        */
        if (1)
        {
            return departTimeObj.getHours() + ":" + departTimeObj.getMinutes();
        }
        /*
        */
    }

    render()
    {
        const imgObj = this.selectThumbnail();
        const timeStr = this.showTime();
        return (
            <Grid>
                <Col size={1}>
                    <Image 
                        style={{width: 20, height: 20}}
                        source={imgObj}
                    />
                </Col>
                <Col size={2}><Text>{this.props.data.line}</Text></Col>
                <Col size={5}><Text>{this.props.data.destination}</Text></Col>
                <Col size={2}><Text>{timeStr}</Text></Col>
            </Grid>
            
        );
    }
}

export default class TransitList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            listData: []
        };
        this.updateFunc();
    }

    handleRequest = async (searchKey) => 
    {
        try {
          let response = await fetch(
            "https://www.cvag.de/eza/mis/stops/station/" + searchKey,
          );
          let responseJson = await response.json();
          this.setState({listData: responseJson.stops});
        } catch (error) {
          console.error(error);
          Alert.alert(
            'Error',
            'Server error!\nPlease try again later ' + error,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
        }
    }

    updateFunc = () => 
    {
        const stationId = this.props.navigation.getParam('stationId', 'CAG-131');
        // this.handleRequest(stationId)
        this.handleRequest(stationId);
        setInterval(() => this.handleRequest(stationId), 10000);
    }

    render()
    {
        return(
            <View>
                <FlatList
                    data = {this.state.listData}
                    extraData = {this.state.listData}
                    renderItem = {({item}) => <ListItem data = {item}/>}
                    keyExtractor = {(item, index) => item.number}
                />
            </View>
        );
    }
}
import React from 'react';
import {Alert, FlatList, StyleSheet, TextInput, Text, TouchableOpacity, View} from 'react-native';

class ItemView extends React.Component
{
    textstyles = StyleSheet.create(
        {
//            lineHeight: 30,
            fontSize: 18
        }
    );

    viewstyles = StyleSheet.create(
        {
            borderWidth: 15, 
            borderColor: 0
        }
    );

    passNextPage = () =>
    {
        const dataObj = this.props.data;
        /*
        Alert.alert(
            'Selected stop',
            dataObj.mandator + "-" + dataObj.number,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
          */
        this.props.passData(this.props.data);
    }

    render()
    {
        return (
            <TouchableOpacity style = {this.viewstyles} onPress={this.passNextPage}>
                <Text style = {this.textstyles}>{this.props.data.displayName}</Text>
            </TouchableOpacity>
        );
    }
}

export default class SearcherView extends React.Component
{
    constructor (props)
    {
        super(props);
        this.state = {
            listData: []
        }
    }

    triggerNextPage = (dataObj) =>
    {
      const key = dataObj.mandator + "-" + dataObj.number;
      this.props.nextAction(key);
      /*
        Alert.alert(
            'Error',
            dataObj.mandator + "-" + dataObj.number,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
          */
    }

    populateData = (dataString) => 
    {
        const data = dataString.stations;
        console.log(data);
        this.setState({
        listData: data
        });
    }

    handleRequest = async (searchKey) => 
    {
        try {
          let response = await fetch(
            this.props.srcLocation + searchKey,
          );
          let responseJson = await response.json();
          this.populateData(responseJson);
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

    render()
    {
        // keyExtractor = {}
        return (
            <View>
                <TextInput onChangeText={(text) => this.handleRequest(text)}/>
                <FlatList
                    data = {this.state.listData}
                    extraData = {this.state.listData}
                    renderItem = {({item}) => <ItemView data = {item} passData={this.triggerNextPage}/>}
                    keyExtractor = {(item, index) => item.number}
                />
            </View>
        );
    }
}

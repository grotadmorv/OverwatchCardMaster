import React, { Component } from 'react';

import { View, Text, StyleSheet, TextInput, Picker, Button } from 'react-native'

class ProfilOverwatchScreen extends Component {

    constructor() {
        super();

        this.state = {
            plateform: "pc",
            region: "eu",
            battletag: ""
        };

    }

    getDataParameters() {
        let url = "https://ow-api.com/v1/stats/" + this.state.plateform + "/" + this.state.region + "/" + this.state.battletag + "/profile";
        var request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
          if (request.readyState !== 4) {
            return;
          }
        
          if (request.status === 200) {
            console.warn('success', request.responseText);
          } else {
            console.warn('error');
          }
        };
        
        request.open('GET', url);
        request.send();
    }


    render() {
        return (
            <View>
                <View>
                    <Text>Platform</Text>
                    <Picker
                        selectedValue={this.state.plateform}
                        style={{ height: 50, width: 100 }}
                        onValueChange={(itemValue) => this.setState({ plateform: itemValue })}>
                        <Picker.Item label="PC" value="pc" />
                        <Picker.Item label="Xbox" value="xbox" />
                        <Picker.Item label="Playstation 4" value="ps4" />
                    </Picker>
                </View>
                <View>
                    <Text>Region</Text>
                    <Picker
                        selectedValue={this.state.region}
                        style={{ height: 50, width: 100 }}
                        onValueChange={(itemValue) => this.setState({ region: itemValue })}>
                        <Picker.Item label="Europe" value="eu" />
                        <Picker.Item label="Asia" value="asia" />
                        <Picker.Item label="America" value="us" />
                    </Picker>
                </View>
                <View>
                    <Text>Battletag</Text>
                    <TextInput
                        onChangeText={(text) => this.setState({ battletag: text })}
                        value={this.state.battletag}
                    />
                </View>
                <View>
                    <Button
                        onPress={() => this.getDataParameters()}
                        title="Search player"
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})


export default ProfilOverwatchScreen

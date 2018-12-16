import React, { Component } from 'react';

import { View, Text, StyleSheet, TextInput, Picker, ImageBackground, Image, TouchableOpacity } from 'react-native'

class ProfilOverwatchScreen extends Component {

    constructor() {
        super();

        this.state = {
            plateform: "pc",
            region: "eu",
            battletag: "",
            stats: []
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
                let response = JSON.parse(request.responseText);
                this.setState({stats: []})
                this.setState({
                    stats: [...this.state.stats, response]
                })
            } else {
                console.warn('error');
            }
        };

        request.open('GET', url);
        request.send();
    }


    render() {
        return (
            <View style={styles.container} >
                <ImageBackground
                    source={require('../Themes/Images/pattern.png')}
                    style={{width: '100%', height: '100%'}}
                >
                <View>
                    <View>
                        <Text style={styles.centerText} >PLATFORM</Text>
                    </View>
                    <View>
                        <Picker
                            selectedValue={this.state.plateform}
                            style={{ height: 50, alignSelf: 'stretch', marginLeft: 50, marginRight: 50 }}
                            onValueChange={(itemValue) => this.setState({ plateform: itemValue })}>
                            <Picker.Item label="PC" value="pc" />
                            <Picker.Item label="Xbox" value="xbox" />
                            <Picker.Item label="Playstation 4" value="ps4" />
                        </Picker>
                    </View>
                </View>
                <View>
                    <View>
                        <Text style={styles.centerText} >REGION</Text>
                    </View>
                    <View>
                        <Picker
                            selectedValue={this.state.region}
                            style={{ height: 50, alignSelf: 'stretch', marginLeft: 50, marginRight: 50 }}
                            onValueChange={(itemValue) => this.setState({ region: itemValue })}>
                            <Picker.Item label="Europe" value="eu" />
                            <Picker.Item label="Asia" value="asia" />
                            <Picker.Item label="America" value="us" />
                        </Picker>
                    </View>
                </View>
                <View>
                    <View>
                        <Text style={styles.centerText}>BATTLETAG</Text>
                    </View>
                    <TextInput
                        style={{ height: 50, alignSelf: 'stretch', textAlign: 'center', fontFamily: 'futura', color: 'white' }}
                        onChangeText={(text) => this.setState({ battletag: text })}
                        value={this.state.battletag}
                    />
                </View>
                <View style={{ height: 50, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }} >

                    <TouchableOpacity style={styles.button} onPress={() => this.getDataParameters()}>
                        <Text style={styles.textButton} > SEARCH A PLAYER </Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <View>
                        <Text style={styles.centerTextName}>
                            {typeof this.state.stats[0] !== "undefined" ? this.state.stats[0].name : "" }
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                        <Image style={styles.icon} source={{uri: typeof this.state.stats[0] !== "undefined" ? this.state.stats[0].icon : "https://www.ikeraguirre.com/wp-content/uploads/sites/2/2016/10/image-transparente.png" }} />
                    </View>
                    <View style={styles.centerView} >
                        <View>
                            <Text style={styles.ratingText} >{typeof this.state.stats[0] !== "undefined" ? this.state.stats[0].rating : "" }</Text>
                        </View>
                        <View>
                            <Image style={styles.ratingIcon} source={{uri: typeof this.state.stats[0] !== "undefined" ? this.state.stats[0].ratingIcon : "https://www.ikeraguirre.com/wp-content/uploads/sites/2/2016/10/image-transparente.png" }} />
                        </View>
                    </View>
                    <View style={{marginTop: 30}} >
                        <View>
                            <Text style={styles.centerText}>
                                {typeof this.state.stats[0] !== "undefined" ? "Played games : "+this.state.stats[0].competitiveStats.games.played : "" }
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.centerText}>
                                {typeof this.state.stats[0] !== "undefined" ? "Played won : "+this.state.stats[0].competitiveStats.games.won : "" }
                            </Text>
                        </View>
                    </View>
                </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1
    },
    button: {
        backgroundColor: "rgb(255, 156, 0)",
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 3,
        padding: 7
    },
    textButton : {
        color: 'white',
        fontFamily: 'futura',
    },
    centerText: {
        textAlign: 'center',
        fontFamily: 'futura',
        color: 'white',
        fontSize: 20,
        textShadowColor: '#336cec',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 7,
        margin: 5
    },
    ratingText: {
        textAlign: 'center',
        fontFamily: 'futura',
        color: 'white',
        textShadowColor: '#336cec',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 7,
    },
    centerTextName: {
        textAlign: 'center',
        fontFamily: 'futura',
        color: 'white',
        fontSize: 25,
        textShadowColor: '#336cec',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 7,
        margin: 5
    },
    icon: {
        width: 50,
        height: 50
    },
    centerView: {
        flex: 1,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    ratingIcon: {
        width: 25,
        height: 25
    }
})


export default ProfilOverwatchScreen

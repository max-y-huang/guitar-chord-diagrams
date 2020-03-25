import React from 'react';
import { View } from 'react-native';
import { Container, Content, Form, Picker, Item, Label, H3, Header, Body, Title, Spinner, Text } from 'native-base';
import * as Font from 'expo-font';
import ChordDiagram from './ChordDiagram';

import inputOptions from './inputOptions.json';

class App extends React.Component {

  state = {
    isReady: false,
    chordRoot: 0,
    chordType: 'maj'
  };

  setChordRoot = (value) => this.setState({ chordRoot: value });
  setChordType = (value) => this.setState({ chordType: value });

  getChordPickerItems = (key) => inputOptions[key].map((item, i) => <Picker.Item key={i} label={item.name} value={item.value} />);

  async componentDidMount() {

    await Font.loadAsync({
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });
    this.setState({ isReady: true });
  }

  render() {

    console.log(this.state.chordRoot, this.state.chordType);

    if (!this.state.isReady) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Spinner />
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <Container>
        <Header>
          <Body>
            <Title>Guitar Chord Diagrams</Title>
          </Body>
        </Header>
        <Content style={{paddingLeft: 20, paddingRight: 20, marginTop: 24, marginBottom: 24}}>
          <H3 style={{marginBottom: 16}}>Input</H3>
          <Form>
            <Item inlineLabel>
              <Label>Chord Root</Label>
              <Picker note mode='dropdown' selectedValue={this.state.chordRoot} onValueChange={this.setChordRoot}>
                {this.getChordPickerItems('roots')}
              </Picker>
            </Item>
            <Item inlineLabel>
              <Label>Chord Type</Label>
              <Picker note mode='dropdown' selectedValue={this.state.chordType} onValueChange={this.setChordType}>
                {this.getChordPickerItems('types')}
              </Picker>
            </Item>
          </Form>
          <H3 style={{marginTop: 32, marginBottom: 16}}>Voicings</H3>
          <ChordDiagram
          markers={[
            {
              type: 'bar',
              finger: 1,
              fret: 13,
              string: {
                start: 0, end: 5
              }
            },
            {
              type: 'normal',
              finger: 2,
              fret: 16,
              string: 2
            },
            {
              type: 'normal',
              finger: 3,
              fret: 14,
              string: 3
            }
          ]}
        />
        </Content>
      </Container>
    );
  }
}

export default App;

import React from 'react';
import { View } from 'react-native';
import { Container, Content, Form, Picker, Item, Label, H3, Header, Body, Title, Spinner, Text } from 'native-base';
import * as Font from 'expo-font';
import Carousel from './Carousel';

import inputOptions from './data/inputOptions.json';
import chordPatterns from './data/chordPatterns.json';

class App extends React.Component {

  state = {
    isReady: false,
    chordRoot: 0,
    chordType: 'maj',
    carouselList: []
  };

  refreshChords = () => {

    const sortFrets = (a, b) => (a.fret - b.fret);
    const correctType = (chord) => (chord.type === this.state.chordType);
    const sortByStartingFret = (a, b) => (a.markers[0].fret - b.markers[0].fret);

    const shiftChord = (chord, shift) => {
      let newChord = JSON.parse(JSON.stringify(chord));
      newChord.markers.forEach((val, i) => {
        newChord.markers[i].fret += shift;
      });
      return newChord;
    }

    let list = [];
    let listBase = chordPatterns.movable.filter(correctType);
    listBase.forEach((chord) => {
      let shift = (this.state.chordRoot - chord.root + 12) % 12;
      let newChord = shiftChord(chord, shift);
      newChord.markers = newChord.markers.sort(sortFrets);
      list.push(newChord);
    });

    this.setState({
      carouselList: list.sort(sortByStartingFret)
    });
  }

  setChordRoot = (value) => this.setState({ chordRoot: value }, () => this.refreshChords());
  setChordType = (value) => this.setState({ chordType: value }, () => this.refreshChords());

  getChordPickerItems = (key) => inputOptions[key].map((item, i) => <Picker.Item key={i} label={item.name} value={item.value} />);

  async componentDidMount() {

    await Font.loadAsync({
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });
    this.refreshChords();
    this.setState({ isReady: true });
  }

  render() {

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
              <Picker mode='dropdown' selectedValue={this.state.chordRoot} onValueChange={this.setChordRoot}>
                {this.getChordPickerItems('roots')}
              </Picker>
            </Item>
            <Item inlineLabel>
              <Label>Chord Type</Label>
              <Picker mode='dropdown' selectedValue={this.state.chordType} onValueChange={this.setChordType}>
                {this.getChordPickerItems('types')}
              </Picker>
            </Item>
          </Form>
          <H3 style={{marginTop: 32, marginBottom: 16}}>Voicings</H3>
          <Carousel list={this.state.carouselList} />
        </Content>
      </Container>
    );
  }
}

export default App;

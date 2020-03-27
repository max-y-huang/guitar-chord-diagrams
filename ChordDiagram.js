import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'native-base';

const chordDiagramImg = {
  nut: require('./assets/chord-diagram-nut.png'),
  noNut: require('./assets/chord-diagram-no-nut.png')
};

class ChordDiagram extends React.Component {

  css = StyleSheet.create({
    container: {
      margin: 0,
      paddingTop: 48,
      paddingBottom: 12,
      position: 'relative'
    },
    fretMarker: {
      position: 'absolute',
      top: 0,
      left: 16,
      height: 48,
      fontSize: 24
    },
    stringData: {
      position: 'absolute',
      transform: [{ translateY: -15 }],
      left: 0,
      fontSize: 20
    }
  });

  constructor(props) {
    super(props);

    let startingFret = 1;
    if (props.shift) {
      startingFret = props.markers.sort((a, b) => (a.fret - b.fret))[0].fret;
    }
    this.state = {
      startingFret: startingFret
    };
  }

  getMarkerList = () => this.props.markers.map((marker, i) => (
    <Marker
      key={Date.now() + '_' + i}
      diagramWidth={this.props.width}
      diagramHeight={this.props.width * 488 / 740}
      startingFret={this.state.startingFret}
      type={marker.type}
      finger={marker.finger}
      fret={marker.fret}
      string={marker.string}
    />
  ));

  render() {

    let img = chordDiagramImg[this.state.startingFret === 1 ? 'nut' : 'noNut'];
    let fretMarkerText = this.state.startingFret === 1 ? '' : this.state.startingFret;

    let stringDataOffset = this.props.width * 488 / 740 + 48;
    let stringDataIncrement = this.props.width * 488 / 740 / 5;

    return (
      <View style={{maxWidth: 360}}>
        <View style={this.css.container}>
          <Image source={img} style={{width: this.props.width, height: undefined, aspectRatio: 740 / 488}} />
          {
            Array(6).fill(0).map((val, i) => {
              return (
                <Text key={Date.now() + '_' + i} style={[this.css.stringData, {top: stringDataOffset - stringDataIncrement * i}]}>
                  {this.props.stringData[i]}
                </Text>
              )
            })
          }
          {this.getMarkerList()}
          <Text style={[this.css.fretMarker, {left: this.props.width * 92 / 740}]}>
            {fretMarkerText}
          </Text>
        </View>
      </View>
    );
  }
}

class Marker extends React.Component {

  css = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 48 - 24 / 2,
      left: 0 - 24 / 2,
      width: 24,
      height: undefined,
      backgroundColor: '#000000',
      borderRadius: 12,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    text: {
      height: '100%',
      textAlign: 'center',
      textAlignVertical: 'center',
      color: '#ffffff',
      fontSize: 16
    }
  });

  render() {

    let xOffset = this.props.diagramWidth * (92 - 6) / 740;
    let yOffset = this.props.diagramHeight * (-4) / 488;

    let fretWidth = (this.props.diagramWidth * (740 - 92) / 740) / 5;
    let fretHeight = this.props.diagramHeight / 5;

    let xDiff = this.props.fret - this.props.startingFret;
    let yDiff = 5 - (this.props.type === 'bar' ? this.props.string.end : this.props.string);

    let translateX = xOffset + fretWidth * (xDiff + 0.5);
    let translateY = yOffset + fretHeight * yDiff;

    let height = 24;
    if (this.props.type === 'bar') {
      height += fretHeight * (this.props.string.end - this.props.string.start);
    }
    let heightAspectRatio = 24 / height;

    return (
      <View style={[this.css.container, {
        transform: [
          { translateX: translateX },
          { translateY: translateY }
        ],
        aspectRatio: heightAspectRatio
      }]}>
        <Text style={this.css.text}>{this.props.finger}</Text>
      </View>
    );
  }
}

export default ChordDiagram;

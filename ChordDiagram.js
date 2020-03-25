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
      height: 48,
      fontSize: 24
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      startingFret: props.markers.sort((a, b) => (a.fret - b.fret))[0].fret
    };
  }

  measureView = (event) => {
    this.setState({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height
    });
  }

  render() {

    let img = chordDiagramImg[this.state.startingFret === 1 ? 'nut' : 'noNut'];
    let fretMarkerText = this.state.startingFret === 1 ? '' : this.state.startingFret;

    return (
      <View style={{maxWidth: 360}}>
        <View style={this.css.container} onLayout={(event) => this.measureView(event)}>
          <Image source={img} style={{width: '100%', height: undefined, maxHeight: '100%', aspectRatio: 740 / 488}} />
          {
            this.props.markers.map((marker, i) => (
              <Marker
                key={i}
                diagramWidth={this.state.width}
                diagramHeight={this.state.height - 48 - 12}
                startingFret={this.state.startingFret}
                type={marker.type}
                finger={marker.finger}
                fret={marker.fret}
                string={marker.string}
              />
            ))
          }
          <Text style={[this.css.fretMarker,
            {
              left: this.state.width * 32 / 740
            }
          ]}>
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
      fontSize: 8
    },
    text: {
      height: '100%',
      textAlign: 'center',
      textAlignVertical: 'center',
      color: '#ffffff'
    }
  });

  render() {

    let xOffset = this.props.diagramWidth * (32 - 6) / 740;
    let yOffset = this.props.diagramHeight * (-4) / 488;

    let fretWidth = (this.props.diagramWidth * (740 - 32) / 740) / 5;
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

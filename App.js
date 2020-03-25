import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ChordDiagram from './ChordDiagram';

class App extends React.Component {

  css = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    dropdown: {
      width: 200
    }
  });

  data = [{
    text: 'Banana',
  }, {
    text: 'Mango',
  }, {
    text: 'Pear',
  }];

  render() {

    return (
      <View style={this.css.container}>
        <Select
          data={this.data}
          selectedOption={this.data[0]}
        />
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
      </View>
    );
  }
}

export default App;

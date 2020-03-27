import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ChordDiagram from './ChordDiagram';

class Carousel extends React.Component {

  css = StyleSheet.create({
  });

  state = {
    width: 0,
    itemSpacing: 16
  };

  measureView = (event) => {
    this.setState({
      width: event.nativeEvent.layout.width
    });
  }

  getList = () => this.props.list.map((diagram, i) => (
    <View key={Date.now() + '_' + i} style={{marginLeft: this.state.itemSpacing / 2, marginRight: this.state.itemSpacing / 2}}>
      <ChordDiagram
        width={this.state.width - this.state.itemSpacing}
        stringData={diagram.stringData}
        markers={diagram.markers}
        shift={('shift' in diagram) ? diagram.shift : true}
      />
    </View>
  ));

  render() {

    return (
      <View onLayout={(event) => this.measureView(event)} style={{alignItems: 'center'}}>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {this.getList()}
        </ScrollView>
      </View>
    );
  }
}

export default Carousel;

import React, { Component } from 'react';
import { Image, View } from 'react-native';
import images from '../../assets/images';

export default class SwipeIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: images.minus,
      showIcon: false
    };
  }
  componentDidMount() {
    this.props.hasRef && this.props.hasRef(this);
  }

  toggleShowHide(val) {
    this.setState({ showIcon: val });
  }

  render() {
    const { icon, showIcon } = this.state;
      return (
        <View style={{ alignItems: 'center', height: 10, marginBottom: 5, position: "relative" }}>
          <Image
            key={"minus"}
            source={images.minus}
            style={{ width: 35, height: 5, opacity: icon === images.minus ? 1 : 0, position: "absolute", top: 0}}
          />
          <Image
            key={"arrow_down"}
            source={images.arrow_down}
            style={{ width: 35, height: 10, opacity: icon === images.minus ? 0 : 1, position: "absolute", top: 0}}
          />
        </View>
      );
  }
}

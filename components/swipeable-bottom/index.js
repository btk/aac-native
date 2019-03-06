import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import SwipeIcon from './components/SwipeIcon';
import images from './assets/images';

import Event from '../../js/event';

const MARGIN_TOP = Platform.OS === 'ios' ? 50 : 30;
const DEVICE_HEIGHT = Dimensions.get('window').height - MARGIN_TOP;

type Props = {
  hasRef?: () => void,
  swipeHeight?: number,
  item?: object,
  disablePressToShow?: boolean,
  style?: object,
  onShowMini?: () => void,
  onShowFull?: () => void,
  animation?: 'linear' | 'spring' | 'easeInEaseOut' | 'none'
};
export default class SwipeUpDown extends Component<Props> {
  static defautProps = {
    disablePressToShow: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
    this.disablePressToShow = props.disablePressToShow;
    this.SWIPE_HEIGHT = props.swipeHeight || 60;
    this._panResponder = null;
    this.top = Dimensions.get('window').height - MARGIN_TOP - this.SWIPE_HEIGHT;
    this.height = Dimensions.get('window').height;
    this.customStyle = {
      style: {
        top: this.top,
        height: this.height
      }
    };
    this.checkCollapsed = true;
    this.showFull = this.showFull.bind(this);

    Event.on("showFull", () => {
      this.showFull();
    });

    Event.on("showMini", () => {
      this.showMini();
    });
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onPanResponderMove: this._onPanResponderMove.bind(this),
      onPanResponderRelease: this._onPanResponderRelease.bind(this)
    });
  }

  componentDidMount() {
    this.props.hasRef && this.props.hasRef(this);
  }

  componentWillReceiveProps(newProps){
    if(newProps.layout != this.props.layout){
      console.log("Layout Changed");
      this.forceUpdate();
    }
  }

  updateNativeProps() {
    var CustomLayoutSpring = {
      duration: 400,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.opacity,
        springDamping: 0.7,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7,
      },
    };

    switch (this.props.animation) {
      case 'linear':
        LayoutAnimation.linear();
        break;
      case 'spring':
        LayoutAnimation.configureNext(CustomLayoutSpring);
        break;
      case 'easeInEaseOut':
        LayoutAnimation.easeInEaseOut();
        break;
      case 'none':
      default:
        break;
    }
    this.viewRef.setNativeProps(this.customStyle);
  }

  _onPanResponderMove(event, gestureState) {
    let DEVICE_HEIGHT = Dimensions.get('window').height - MARGIN_TOP;
    if (gestureState.dy > 0 && !this.checkCollapsed) {
      // SWIPE DOWN

      this.customStyle.style.top = this.top + gestureState.dy;
      //this.customStyle.style.height = DEVICE_HEIGHT - gestureState.dy;
      this.swipeIconRef && this.swipeIconRef.setState({
        icon: images.minus
      });
      !this.state.collapsed && this.setState({ collapsed: true });
      this.updateNativeProps();
    } else if (this.checkCollapsed && gestureState.dy < -80) {
      // SWIPE UP
      this.top = 0;
      this.customStyle.style.top = DEVICE_HEIGHT + gestureState.dy;
      //this.customStyle.style.height = -gestureState.dy + this.SWIPE_HEIGHT;
      this.swipeIconRef &&
        this.swipeIconRef.setState({ icon: images.minus, showIcon: true });
      if (this.customStyle.style.top <= DEVICE_HEIGHT / 2) {
        this.swipeIconRef &&
          this.swipeIconRef.setState({
            icon: images.arrow_down,
            showIcon: true
          });
      }
      this.updateNativeProps();
      this.state.collapsed && this.setState({ collapsed: false });
    }
  }

  _onPanResponderRelease(event, gestureState) {
    if (gestureState.dy < -50 || gestureState.dy < 50) {
      this.showFull();
    } else {
      this.showMini();
    }
  }

  showFull() {
    const { onShowFull } = this.props;
    this.customStyle.style.top = 0;
    this.swipeIconRef &&
      this.swipeIconRef.setState({ icon: images.arrow_down, showIcon: true });
    this.updateNativeProps();
    this.state.collapsed && this.setState({ collapsed: false });
    this.checkCollapsed = false;
    onShowFull && onShowFull();
    Event.emit("showKeyboard");
  }

  showMini() {
    const { onShowMini, item } = this.props;
    this.customStyle.style.top = Dimensions.get('window').height - MARGIN_TOP - this.SWIPE_HEIGHT;
    this.swipeIconRef && this.swipeIconRef.setState({ showIcon: false });
    this.updateNativeProps();
    !this.state.collapsed && this.setState({ collapsed: true });
    this.checkCollapsed = true;
    onShowMini && onShowMini();
    Event.emit("dismissKeyboard");
  }

  render() {
    const { item, style } = this.props;
    const { collapsed } = this.state;
    return (
      <View
        ref={ref => (this.viewRef = ref)}
        {...this._panResponder.panHandlers}
        style={[
          styles.wrapSwipe,
          {
            top: Dimensions.get('window').height - MARGIN_TOP - 80,
            height: Dimensions.get('window').height - MARGIN_TOP,
            marginTop: MARGIN_TOP
          },
          !item && collapsed && { marginBottom: -200 },
          style
        ]}
      >
        <SwipeIcon
          onClose={() => this.showMini()}
          hasRef={ref => (this.swipeIconRef = ref)}
        />
        {collapsed &&
          <TouchableWithoutFeedback onPress={() => this.showFull()}>
            <View style={{height: this.SWIPE_HEIGHT, width: "100%", position: "absolute", top: 0, left: 10, zIndex: 99}}></View>
          </TouchableWithoutFeedback>
        }
        {collapsed ? (
          item ? item : null
        ) : (
          item
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapSwipe: {
    padding: 10,
    backgroundColor: '#ccc',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 2
  }
});

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var styles = react_native_1.StyleSheet.create({
    root: __assign({}, react_native_1.Platform.select({
        ios: {},
        android: {}
    }))
});
var Touchable = /** @class */ (function (_super) {
    __extends(Touchable, _super);
    function Touchable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            anim: new react_native_1.Animated.Value(1)
        };
        _this.handlePressIn = function () {
            react_native_1.Animated.timing(_this.state.anim, {
                toValue: 0.9,
                duration: 150,
                easing: react_native_1.Easing.out(react_native_1.Easing.quad),
                useNativeDriver: true
            }).start();
        };
        _this.handlePresOut = function () {
            react_native_1.Animated.timing(_this.state.anim, {
                toValue: 1,
                duration: 300,
                easing: react_native_1.Easing.out(react_native_1.Easing.quad),
                useNativeDriver: true
            }).start();
        };
        return _this;
    }
    Touchable.prototype.render = function () {
        return (<react_native_1.TouchableWithoutFeedback onPress={this.props.onPress} onPressIn={this.handlePressIn} onPressOut={this.handlePresOut}>
        <react_native_1.Animated.View style={[
            styles.root,
            this.props.style,
            { transform: [{ scale: this.state.anim }] }
        ]}>
          {this.props.children}
        </react_native_1.Animated.View>
      </react_native_1.TouchableWithoutFeedback>);
    };
    return Touchable;
}(React.Component));
exports.default = Touchable;
//# sourceMappingURL=index.js.map

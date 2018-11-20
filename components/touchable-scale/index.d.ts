/// <reference types="react" />
import * as React from "react";
import { ViewStyle } from "react-native";
export interface TouchableProps {
    onPress?: () => void;
    style?: ViewStyle;
}
export default class Touchable extends React.Component<TouchableProps> {
    state: {
        anim: any;
    };
    handlePressIn: () => void;
    handlePresOut: () => void;
    render(): JSX.Element;
}

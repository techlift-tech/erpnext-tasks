import * as React from 'react'
import { View, StyleSheet, ActivityIndicator, Animated } from 'react-native'

interface Props {
  isLoading: boolean
  style: Object
  children: any
}

interface States {
  opacityValue: any
  translateYValue: any
}

class Wapper extends React.Component<Props, States> {

  constructor(props: Props) {
    super(props);
    this.state = {
      opacityValue: new Animated.Value(0),
      translateYValue: new Animated.Value(500),
    };
  }

  componentDidMount() {
    this.show(this.props);
  }

  componentWillReceiveProps(nextProps: any) {
    if (!this.props.isHidden && nextProps.isHidden) {
      this.hide(nextProps);
    }
    if (this.props.isHidden && !nextProps.isHidden) {
      this.show(nextProps);
    }
  }

  show(props: any) {
    const { opacityValue, translateYValue } = this.state;
    Animated.parallel([
      Animated.timing(opacityValue, { toValue: 1, duration: 200 }),
      Animated.timing(translateYValue, { toValue: 0, duration: 1000 }),
    ]).start();
  }

  hide(props: any) {
    const { opacityValue, translateYValue } = this.state;
    Animated.parallel([
      Animated.timing(opacityValue, { toValue: 0, duration: 100 }),
      Animated.timing(translateYValue, { toValue: 500, duration: 100 }),
    ]).start();
  }

  render() {
    const { children, isLoading, style } = this.props
    const { opacityValue, translateYValue } = this.state;
    const animatedStyle = {
      // opacity: opacityValue,
      // transform: [{ translateY: translateYValue }],
    };
    return (
      <View style={style}>
        <Animated.View style={animatedStyle}>{children}</Animated.View>
        {isLoading &&
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
            ]}
          >
            <ActivityIndicator size="large" />
          </View>}
      </View>
    );
  }
};
export default Wapper
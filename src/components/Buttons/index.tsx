import * as React from 'react'
import { TouchableOpacity, Text, View, StyleSheet, ActivityIndicator, Animated } from 'react-native'
import styles from './styles'

interface Props {
  isLoading: boolean
  text: string
  onPress: any
  style: any
}

interface States {
  animating: boolean
}

class Buttons extends React.Component<Props, States> {

  constructor(props: Props) {
    super(props);
    this.state = {
      animating: true
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ animating: false }), 60000)
  }


  render() {
    const { isLoading, text, onPress, style } = this.props
    const { animating } = this.state;
    return (
      <TouchableOpacity style={[styles.buttonBg, style]} onPress={onPress}>
        {isLoading ? <ActivityIndicator animating={animating} color='#fff' /> : <Text style={styles.buttonTxt}>{text}</Text>}
      </TouchableOpacity>
    );
  }
};
export default Buttons
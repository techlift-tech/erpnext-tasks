import * as React from 'react'
import { View, Text, LayoutAnimation, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { EventEmitter, Timer } from '@app/Global';
import styles from './styles'

interface Props extends StateProps, DispatchProps {

}

interface States {

}

class StatusInfo extends React.Component<Props, States> {

  public nextToastId: number
  public toastListener: any

  constructor(props: Props) {
    super(props);
    this.nextToastId = 0;
    this.renderToast = this.renderToast.bind(this);
  }

  componentDidMount() {
    this.toastListener = EventEmitter.addListener('toast', this.doToast.bind(this));
  }

  componentWillUnmount() {
    this.toastListener.remove();
  }

  shouldComponentUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return true;
  }

  render() {
    const { toast } = this.props;
    return (
      <View style={styles.container}>
        {toast.list.map(this.renderToast)}
      </View>
    );
  }

  renderToast(msg: any, index: number) {
    const { removeToast } = this.props;
    const onPress = () => removeToast(msg.key);
    return (
      <TouchableOpacity key={index} style={styles.textWrap} onPress={onPress}>
        <Text style={styles.text}>{msg.msg}</Text>
      </TouchableOpacity>
    );
  }

  doToast(msg: any, duration = 4000) {
    const { addToast, removeToast } = this.props;
    const key = this.nextToastId++;
    addToast(msg, key);
    Timer.setTimeout(() => removeToast(key), duration);
  }
}


interface StateProps {
  toast: any
}

const mapStateToProps = (state: any): StateProps => ({
  toast: state.toast
})

interface DispatchProps {
  addToast: any;
  removeToast: any;
}

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  const { actions } = require('@stores/StatusStore')
  return {
    addToast: (msg: string, key: any) => dispatch(actions.addToast(msg, key)),
    removeToast: (msg: string) => dispatch(actions.removeToast(msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusInfo);

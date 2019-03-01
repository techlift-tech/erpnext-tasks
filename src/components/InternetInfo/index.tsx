import * as React from 'react'
import { View, Text, NetInfo } from 'react-native'
import { connect } from 'react-redux'
import { Languages } from "@common"
import { toast } from '@app/Global'
import styles from './styles'

interface Props extends StateProps, DispatchProps {
  navigation: any
}

interface States {
  showMessage: boolean
}

class InternetInfo extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showMessage: true
    }
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleFirstConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleFirstConnectivityChange);
  }

  handleFirstConnectivityChange = (isConnected: any) => {
    const { showMessage } = this.state
    const { updateConnectionStatus } = this.props
    updateConnectionStatus(isConnected);
    if (!isConnected) return;
    if (!showMessage) {
      toast(Languages.reConnection);
    } else {
      this.setState({ showMessage: false })
    }
  };

  render() {
    const { netInfo } = this.props;
    if (netInfo.isConnected) return <View />;
    return (
      <View style={styles.connectionStatus}>
        <Text style={styles.connectionText}>{Languages.noConnection}</Text>
      </View>
    );
  }
}

interface StateProps {
  netInfo: any
}

const mapStateToProps = (state: any): StateProps => ({
  netInfo: state.netInfo
})

interface DispatchProps {
  updateConnectionStatus: any;
}

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  const { actions } = require('@stores/InternetStore')
  return {
    updateConnectionStatus: (isConnected: any) => dispatch(actions.updateConnectionStatus(isConnected)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InternetInfo);
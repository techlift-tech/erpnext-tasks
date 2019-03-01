'use strict'

import * as React from 'react'
import { View, Image } from 'react-native'
import { Spinner } from 'native-base'
import { toast, error } from '@app/Global'
import { connect } from 'react-redux'
import { Languages, Images, Color } from '@common'
import styles from './styles'

interface Props extends StateProps {
    navigation: any
}

interface States {
    isLoading: boolean
}

class Auth extends React.Component<Props, States> {

    static navigationOptions = () => ({
        header: null
    })

    constructor(props: Props) {
        super(props)
        this.state = {
            isLoading: true,
        }
        this.checkConnection = this.checkConnection.bind(this)
        this.stopAndToast = this.stopAndToast.bind(this)
    }

    componentDidMount() {
        const { navigate } = this.props.navigation;
        const { user } = this.props
        if (user) {
            navigate('Projects')
        } else {
            navigate('Login')
        }
    }


    checkConnection() {
        const { netInfo } = this.props
        if (!netInfo.isConnected) toast(Languages.noConnection)
        return netInfo.isConnected
    }

    stopAndToast(msg: string) {
        toast(msg);
        error(msg);
        this.setState({ isLoading: false });
    }


    render() {
        return (
            <View style={styles.container}>
                <Image source={Images.loginLogo} />
                <Spinner color={Color.primary} />
            </View>
        );
    }
}

interface StateProps {
    netInfo: any,
    user: any[]
}

const mapStateToProps = (state: any): StateProps => ({
    netInfo: state.netInfo,
    user: state.user.user
})
export default connect(mapStateToProps, undefined)(Auth)
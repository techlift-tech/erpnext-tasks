'use strict'

import * as React from 'react'
import { Card, Form, Item, Input, Label, Button, Text } from 'native-base';
import { View, Image, ScrollView, TouchableOpacity, Animated } from 'react-native'
import { toast, error } from '@app/Global'
import { connect } from 'react-redux'
import { Languages, Images, Color, FormValidate } from '@common'
import { Wapper, Buttons } from '@components'
import * as ERPNextAPI from '../../services/erpNextAPI'
import styles from './styles'
import { LoginObject } from '../../models/Login'

interface Props extends StateProps, DispatchProps {
    navigation: any
}

interface States {
    isLoading: boolean
    username: string
    password: string
    serverUrl: string
}

class Login extends React.Component<Props, States> {

    static navigationOptions = () => ({
        header: null
    })

    public erpNextAPi: ERPNextAPI.ERPNextAPI
    constructor(props: Props) {
        super(props)
        this.state = {
            isLoading: false,
            username: '',
            password: '',
            serverUrl: ''
        }

        this.checkConnection = this.checkConnection.bind(this)
        this.stopAndToast = this.stopAndToast.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.erpNextAPi = ERPNextAPI.ERPNextAPI.getInstance()
    }

    componentDidMount() {
        this.setState({ username: 'palash@techlift.in' })
        this.setState({ password: 'Palash222@' })
        this.setState({ serverUrl: 'http://techlift.in' })
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

    validateForm() {
        const { username, password, serverUrl } = this.state
        if (
            FormValidate.isEmpty(username, password, serverUrl)
        ) {
            return 'Please complete the form'
        }
        return undefined
    }


    async onLoginPressHandle() {
        const { navigate } = this.props.navigation;
        const { login, netInfo } = this.props
        const { username, password, serverUrl } = this.state

        if (!netInfo.isConnected) return toast(Languages.noConnection)

        const _error = this.validateForm()
        if (_error) return this.stopAndToast(_error)

        this.setState({ isLoading: true });
        try {
            let loginReturn: LoginObject = await this.erpNextAPi.login(serverUrl, username, password)
            this.stopAndToast(`Welcome Back ${loginReturn.full_name}`)
            login(loginReturn)
            navigate('Projects')
            this.setState({ isLoading: false })
        } catch (error) {
            console.log(error)
            this.stopAndToast(Languages.GetDataError)
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { isLoading, username, password, serverUrl } = this.state
        return (
            <Wapper isLoading={isLoading} style={styles.container}>
                <ScrollView>
                    <View style={styles.erplogo}><Image source={Images.erpLogo} /></View>
                    <View style={styles.applogo}><Image source={Images.loginLogo} /></View>
                    <View style={styles.contBox}>
                        <Card style={styles.cardBg}>
                            <Form>
                                <Item floatingLabel>
                                    <Label>Username</Label>
                                    <Input
                                        {...commonInputProps}
                                        ref="username"
                                        value={username}
                                        onChangeText={username => this.setState({ username })}
                                        onSubmitEditing={() => this.refs.password && this.refs.password.focus()}
                                        returnKeyType={'next'}
                                    />
                                </Item>
                                <Item floatingLabel>
                                    <Label>Password</Label>
                                    <Input
                                        {...commonInputProps}
                                        ref="password"
                                        value={password}
                                        secureTextEntry={true}
                                        onChangeText={password => this.setState({ password })}
                                        onSubmitEditing={() => this.refs.server && this.refs.server.focus()}
                                        returnKeyType={'next'}
                                    />
                                </Item>
                                <Item floatingLabel>
                                    <Label>Server</Label>
                                    <Input
                                        {...commonInputProps}
                                        ref="server"
                                        value={serverUrl}
                                        onChangeText={serverUrl => this.setState({ serverUrl })}
                                        returnKeyType={'go'}
                                    />
                                </Item>
                                <Buttons
                                    text={'Login'}
                                    isLoading={isLoading}
                                    onPress={this.onLoginPressHandle.bind(this)}
                                />
                            </Form>
                        </Card>
                    </View>
                </ScrollView>
            </Wapper>
        )
    }
}

const commonInputProps = {
    underlineColorAndroid: 'transparent',
    placeholderTextColor: Color.blackTextSecondary,
}

interface StateProps {
    netInfo: any,
    user: any[]
    parms: any[]
}

const mapStateToProps = (state: any): StateProps => ({
    netInfo: state.netInfo,
    user: state.user.user,
    parms: state.user.parms
})

interface DispatchProps {
    login: any;
}

const mapDispatchToProps = (stateProps: any, dispatchProps: any, ownProps: any) => {
    const { dispatch } = dispatchProps;
    const { actions } = require('@stores/UserStore')
    return {
        ...stateProps,
        ...ownProps,
        login: (data: any) => dispatch(actions.login(data))
    }
}
export default connect(mapStateToProps, undefined, mapDispatchToProps)(Login)
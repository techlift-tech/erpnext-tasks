import React, { Component } from 'react';
import { BackHandler } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Title, Content, Icon, Text, } from 'native-base';
import {
    StyleSheet,
    ScrollView,
    View,
    Image,
    TouchableHighlight,
    Dimensions,
    RefreshControl,
    LayoutAnimation,
    TouchableOpacity,
    Animated
} from "react-native";
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Wapper } from '@components'
import HTML from 'react-native-render-html';
import { toast, error } from '@app/Global';
import { connect } from 'react-redux'
import { Spinner } from '@components'
import { Languages } from '@common'
import { TaskData } from '../../services/Task'
import styles from './detailsStyles'
import Images from '../../common/Images';

interface Props extends StateProps, DispatchProps {
    navigation: any
}

interface States {
    isLoading: boolean
    togalCloseTask: boolean
    taskListOpen: any
    taskListClose: any
}

class ProjectsDetails extends React.Component<Props, States> {



    static navigationOptions = () => ({
        header: null
    })

    constructor(props: Props) {
        super(props)
        this.state = {
            taskListOpen: [],
            taskListClose: [],
            togalCloseTask: false,
            isLoading: false,
        }

        this.checkConnection = this.checkConnection.bind(this)
        this.stopAndToast = this.stopAndToast.bind(this)

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

    componentDidMount() {
        const { params } = this.props.navigation.state
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        let tempTaskListOpen = []
        let tempTaskListClose = []
        for (let item of params.tasks) {
            if (item.status === 'Closed') {
                tempTaskListClose.push(item)
            } else {
                tempTaskListOpen.push(item)
            }
        }

        this.setState({ taskListOpen: tempTaskListOpen })
        this.setState({ taskListClose: tempTaskListClose })
    }

    handleBackButton() {
        return true;
    }

    togelCloseBox() {
        this.setState({ togalCloseTask: !this.state.togalCloseTask })
    }

    async openTask(key: number, val: any) {
        const { taskListOpen, taskListClose } = this.state
        let temptaskListOpen = taskListOpen
        let temptaskListClose = taskListClose
        temptaskListClose.splice(key, 1)
        temptaskListOpen.push(val)
        this.setState({ taskListOpen: temptaskListOpen })
        this.setState({ taskListClose: temptaskListClose })

        this.setState({ isLoading: true })
        let taskData: TaskData = TaskData.getInstance()
        try {
            await taskData.openTask(val)
            this.setState({ isLoading: false })
        } catch (error) {
            console.log(error)
            this.stopAndToast(Languages.GetDataError)
            this.setState({ isLoading: false })
        }
    }

    async closeTask(key: number, val: any) {
        const { taskListOpen, taskListClose } = this.state
        let temptaskListOpen = taskListOpen
        let temptaskListClose = taskListClose
        temptaskListOpen.splice(key, 1)
        temptaskListClose.push(val)
        this.setState({ taskListOpen: temptaskListOpen })
        this.setState({ taskListClose: temptaskListClose })

        this.setState({ isLoading: true })
        let taskData: TaskData = TaskData.getInstance()
        try {
            await taskData.closeTask(val)
            this.setState({ isLoading: false })
        } catch (error) {
            console.log(error)
            this.stopAndToast(Languages.GetDataError)
            this.setState({ isLoading: false })
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state
        const { isLoading, togalCloseTask, taskListOpen, taskListClose } = this.state
        return (<Container>
            <Header style={styles.headerArea}>
                <Left>
                    <Button transparent onPress={() => navigate('Projects')}>
                        <Icon name='arrow-back' style={styles.headerIcons} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.titleTxt}>{params.project_name}</Title>
                </Body>
                <Right></Right>
            </Header>
            <View style={{ flex: 1 }}>
                <Image style={styles.bg} source={Images.bg} />
                <Animated.View
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        style={styles.content}
                        keyboardDismissMode={"on-drag"}
                        keyboardShouldPersistTaps="always"
                        scrollEventThrottle={200}
                    >

                        <View>
                            {taskListOpen.map((val, key) => {
                                return <TouchableHighlight key={key}
                                    style={[
                                        styles.containers,
                                        {
                                            backgroundColor: "#d6eeff"
                                        }
                                    ]}
                                    underlayColor={"#d6eeff"}
                                    activeOpacity={1}
                                >
                                    <View style={[styles.wrap, { opacity: 1 }]}>
                                        <TouchableOpacity
                                            style={styles.btns}
                                            activeOpacity={1}
                                            onPress={() => this.closeTask(key, val)}
                                        >
                                            <View style={styles.checkbox}>
                                                {/* <Icons name='check' /> */}
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.body}>
                                            <Text style={styles.taskTitle} onPress={() => navigate('UpdateTask', val)}>{val.title}</Text>
                                            <Text style={styles.dateTitle} onPress={() => navigate('UpdateTask', val)}>{new Date(val.creation).toLocaleDateString()}</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            })}
                            <View>
                                <TouchableHighlight
                                    activeOpacity={1}
                                    underlayColor={"rgba(0,0,0,0.4)"}
                                    style={styles.btn}
                                    onPress={() => this.togelCloseBox()}
                                >
                                    <Text style={styles.btnText}>{togalCloseTask ? 'COMPLETED TO-DOS' : 'OPEN COMPLETED TO-DOS'}</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={togalCloseTask ? '' : styles.ProjListTogal}>
                                {taskListClose.map((val, key) => {
                                    return <TouchableHighlight key={key}
                                        style={[
                                            styles.containers,
                                            {
                                                backgroundColor: "#d6eeff"
                                            }
                                        ]}
                                        underlayColor={"#d6eeff"}
                                        activeOpacity={1}
                                    >
                                        <View style={[styles.wrap, { opacity: 1 }]}>
                                            <TouchableOpacity
                                                style={styles.btns}
                                                activeOpacity={1}
                                                onPress={() => this.openTask(key, val)}
                                            >
                                                <View style={styles.checkbox}>
                                                    <Icons name='check' />
                                                </View>
                                            </TouchableOpacity>
                                            <View style={styles.body}>
                                                <Text style={[styles.taskTitle, styles.checked]} onPress={() => navigate('UpdateTask', val)}>{val.title}</Text>
                                                <Text style={[styles.dateTitle, styles.checked]} onPress={() => navigate('UpdateTask', val)}>{new Date(val.creation).toLocaleDateString()}</Text>
                                            </View>


                                        </View>
                                    </TouchableHighlight>
                                })}
                            </View>
                        </View>
                    </ScrollView>
                </Animated.View>
            </View>
        </Container>
        )
    }
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
    logout: any;
}


const mapDispatchToProps = (stateProps: any, dispatchProps: any, ownProps: any) => {
    const { dispatch } = dispatchProps;
    const { actions } = require('@stores/UserStore')
    return {
        ...stateProps,
        ...ownProps,
        logout: () => dispatch(actions.logout()),
    }
}
export default connect(mapStateToProps, undefined, mapDispatchToProps)(ProjectsDetails)
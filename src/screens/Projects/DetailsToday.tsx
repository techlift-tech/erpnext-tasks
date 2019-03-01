import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Title, Content, ListItem, Text, } from 'native-base';
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
import Icon from 'react-native-vector-icons/MaterialIcons'
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
    checkmarkVisible: boolean
    taskListOpen: any
}

class DetailsToday extends React.Component<Props, States> {



    static navigationOptions = () => ({
        header: null
    })

    constructor(props: Props) {
        super(props)
        this.state = {
            taskListOpen: [],
            isLoading: false,
            checkmarkVisible: false,
        }

        this.checkConnection = this.checkConnection.bind(this)
        this.stopAndToast = this.stopAndToast.bind(this)

    }

    onCheckPressIn() {
        this.setState({ checkmarkVisible: true });
    }

    onCheckPressOut() {
        this.setState({ checkmarkVisible: false });
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
        let tempTaskListOpen = []
        for (let item of params.data) {
            let tempTaskOpen = []
            for (let task of item.tasks) {
                if (task.status !== 'Closed') {
                    tempTaskOpen.push(task)
                }
            }
            tempTaskListOpen.push({ title: item.project_name, task: tempTaskOpen })
        }
        this.setState({ taskListOpen: tempTaskListOpen })
    }

    async closeTask(k: number, key: number, val: any) {
        const { taskListOpen } = this.state
        let temptaskListOpen = taskListOpen
        temptaskListOpen[k].task.splice(key, 1)
        this.setState({ taskListOpen: temptaskListOpen })


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
        const { isLoading, taskListOpen, checkmarkVisible } = this.state
        return (<Container>
            <Header style={styles.headerArea}>
                <Left>
                    <Button transparent onPress={() => navigate('Projects')}>
                        <Icon name='arrow-back' style={styles.headerIcons} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.titleTxt}>{params.title}</Title>
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

                        <View style={{ flexDirection: "column-reverse" }}>
                            {taskListOpen.map((v, k) => {
                                return <View key={k}>
                                    <TouchableHighlight
                                        activeOpacity={1}
                                        underlayColor={"rgba(0,0,0,0.4)"}
                                        style={styles.btn}
                                    >
                                        <Text style={styles.btnText}>{v.title}</Text>
                                    </TouchableHighlight>
                                    {v.task.map((val, key) => {
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
                                                    onPress={() => this.closeTask(k, key, val)}
                                                // onPressIn={this.onCheckPressIn.bind(this)}
                                                // onPressOut={this.onCheckPressOut.bind(this)}
                                                >
                                                    <View style={styles.checkbox}>
                                                        {/* {!checkmarkVisible && (
                                                            <Icon name='check' />
                                                        )} */}
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={styles.body}>
                                                    <Text style={styles.taskTitle} onPress={() => navigate('UpdateTask', val)}>{val.title}</Text>
                                                    <Text style={styles.dateTitle} onPress={() => navigate('UpdateTask', val)}>{new Date(val.creation).toLocaleDateString()}</Text>
                                                </View>


                                            </View>
                                        </TouchableHighlight>
                                    })}
                                </View>
                            })}
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
export default connect(mapStateToProps, undefined, mapDispatchToProps)(DetailsToday)
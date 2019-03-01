import * as React from 'react';
import { BackHandler, TouchableOpacity, View } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Title, Textarea, Item, Icon, Text, Picker, DatePicker } from 'native-base';
import Icons from 'react-native-vector-icons/Entypo'
import { Wapper } from '@components'
import HTML from 'react-native-render-html';
import { toast, error } from '@app/Global';
import { connect } from 'react-redux'
import { Spinner } from '@components'
import { Languages } from '@common'
import { TaskData } from '../../services/Task'
import styles from './AddNewTaskStyle'

interface Props extends StateProps, DispatchProps {
    navigation: any
}

interface States {
    isLoading: boolean
    projectName: string
    taskName: string
    chosenDate: any
}

class AddNewTask extends React.Component<Props, States> {

    // public erpNextAPi: ERPNextAPI.ERPNextAPI

    static navigationOptions = () => ({
        header: null
    })

    public _listName: any

    constructor(props: Props) {
        super(props)
        this.state = {
            projectName: '',
            taskName: '',
            chosenDate: new Date(),
            isLoading: false,
        }

        this.setDate = this.setDate.bind(this);

        this.checkConnection = this.checkConnection.bind(this)
        this.stopAndToast = this.stopAndToast.bind(this)
        // this.erpNextAPi = ERPNextAPI.ERPNextAPI.getInstance()
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    onValueChange2(value) {
        this.setState({
            projectName: value
        });
    }

    checkConnection() {
        const { netInfo } = this.props
        if (!netInfo.isConnected) toast(Languages.noConnection)
        return netInfo.isConnected
    }

    stopAndToast(msg) {
        toast(msg);
        error(msg);
        this.setState({ isLoading: false });
    }

    componentDidMount() {
        this._listName._root.focus();
    }

    async addTask() {
        const { navigate } = this.props.navigation;
        const { isLoading, projectName, taskName } = this.state
        this.setState({ isLoading: true })
        let taskData: TaskData = TaskData.getInstance()
        try {
            await taskData.addNewTask(taskName, projectName)
            navigate('Projects')
            this.setState({ isLoading: false })
        } catch (error) {
            console.log(error)
            this.stopAndToast(Languages.GetDataError)
            this.setState({ isLoading: false })
        }
    }

    render() {
        const { params } = this.props.navigation.state
        const { logout, user } = this.props
        console.log(params)
        const { navigate } = this.props.navigation;
        const { isLoading, projectName, taskName } = this.state
        return (
            <Container>
                <Header style={styles.headerArea}>
                    <Left>
                        <TouchableOpacity style={styles.headerLeft}>
                            <View style={styles.userIcon}><Title style={styles.userIconTxt}>{user ? user.full_name[0] : 'D'}</Title></View>
                            <Title style={styles.titleTxt}>{user ? user.full_name : 'Demo'}</Title>
                        </TouchableOpacity>
                    </Left>
                    <Right>
                        <Button transparent>
                            <Icons name='bell' style={styles.headerIcons} />
                        </Button>
                        <Button transparent>
                            <Icons name='message' style={styles.headerIcons} />
                        </Button>
                        <Button onPress={() => { logout(); navigate('Login') }} transparent>
                            <Icons name='magnifying-glass' style={styles.headerIcons} />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.contentArea}>
                    <View style={styles.topArea}>
                        <Textarea
                            style={styles.listNameStyle}
                            ref={c => this._listName = c}
                            value={taskName}
                            onChangeText={taskName => this.setState({ taskName })}
                            rowSpan={5} bordered
                            placeholder="Add a to-do in Inbox..."
                        />
                    </View>
                    <View style={styles.footerArea}>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icons name="chevron-small-down" />}
                                style={styles.pickerStyle}
                                placeholder="Select a Project"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={projectName}
                                onValueChange={this.onValueChange2.bind(this)}
                            >
                                {params.map((val, key) => {
                                    return <Picker.Item label={val.project_name} key={key} value={val.project_name} />
                                })}
                            </Picker>
                        </Item>
                        <View style={styles.footerIcons}>
                            <DatePicker
                                defaultDate={new Date(2018, 4, 4)}
                                minimumDate={new Date(2018, 1, 1)}
                                maximumDate={new Date(2018, 12, 31)}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText={<Icons name='calendar' style={styles.footerIcon} />}
                                textStyle={{ color: "green" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={this.setDate}
                            />
                            <TouchableOpacity><Icon name='star' style={styles.footerIcon} /></TouchableOpacity>
                            <TouchableOpacity onPress={() => navigate('Projects')}><Text style={styles.footerCancel}>CANCEL</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.addTask()}><Text style={styles.footerAdd}>ADD</Text></TouchableOpacity>
                        </View>
                    </View>
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
export default connect(mapStateToProps, undefined, mapDispatchToProps)(AddNewTask)
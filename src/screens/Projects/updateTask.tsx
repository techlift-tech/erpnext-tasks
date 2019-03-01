import * as React from 'react';
import { BackHandler } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Title, Content, ListItem, Text, Icon, DatePicker, CheckBox, Form, Item, Label, Input } from 'native-base';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/dist/Entypo';
import { Wapper } from '@components'
import HTML from 'react-native-render-html';
import { toast, error } from '@app/Global';
import { connect } from 'react-redux'
import { Spinner } from '@components'
import { Languages } from '@common'
import { TaskData } from '../../services/Task'
import styles from './updateTaskStyle'

interface Props extends StateProps, DispatchProps {
    navigation: any
}

interface States {
    isLoading: boolean
    projectName: string
    taskName: string
    chosenDate: any
}

class UpdateTask extends React.Component<Props, States> {

    // public erpNextAPi: ERPNextAPI.ERPNextAPI

    static navigationOptions = () => ({
        header: null
    })

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
        console.log(params)
        const { navigate } = this.props.navigation;
        const { isLoading, projectName, taskName } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.headerArea}>
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button transparent onPress={() => navigate('Projects')}>
                            <Icon name='arrow-back' style={styles.headerIcons} />
                        </Button>
                        <Title style={styles.titleTxt}>{params ? params.title : 'New'}</Title>
                    </Left>
                    <Right>
                        <Icon name='star' style={styles.listIcons} />
                    </Right>
                </View>
                <View style={styles.contentArea}>
                    <Content>
                        <ListItem>
                            <Icon name='calendar' style={[styles.listIcons, styles.assignedIcons]} />
                            <Content>
                                <DatePicker
                                    defaultDate={new Date(2018, 4, 4)}
                                    minimumDate={new Date(2018, 1, 1)}
                                    maximumDate={new Date(2018, 12, 31)}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Set Date & Reminder"
                                    textStyle={{ color: "green" }}
                                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                                    onDateChange={this.setDate}
                                />
                            </Content>
                        </ListItem>
                        <ListItem>
                            <CheckBox checked={false} color="green" />
                            <Body>
                                <Text>Design Layout</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <Icon name='add' style={[styles.listIcons, styles.assignedIcons]} />
                            <Form>
                                <Input placeholder="Add a subtask" />
                            </Form>
                        </ListItem>
                    </Content>
                </View>
            </View>
            // <View style={styles.container}>
            //     <View style={styles.headerArea}>
            //         <View style={styles.headerLeft}>
            //             <TouchableOpacity onPress={() => navigate('Projects')}>
            //                 <Icon name='arrow-back' style={styles.iconImg} />
            //             </TouchableOpacity>
            //             <Text style={styles.titleTxt}>{params.title}</Text>
            //         </View>
            //         {/* <View style={styles.headerIcon}>
            //             <TouchableOpacity><Icon name='star' style={styles.iconImg} /></TouchableOpacity>
            //         </View> */}
            //     </View>
            //     <View style={styles.contentArea}>
            //         <View style={styles.topArea}>
            //             <Textarea
            //                 value={taskName}
            //                 onChangeText={taskName => this.setState({ taskName })}
            //                 style={{ borderColor: '#F9F9F9', fontSize: 18, }} rowSpan={5} bordered
            //                 placeholder="Add a to-do in Inbox..."
            //             />
            //         </View>
            //         <View style={styles.footerArea}>
            //             <Item picker>
            //                 <Picker
            //                     mode="dropdown"
            //                     iosIcon={<Icon name="ios-arrow-down-outline" />}
            //                     style={{ width: undefined }}
            //                     placeholder="Select a Project"
            //                     placeholderStyle={{ color: "#bfc6ea" }}
            //                     placeholderIconColor="#007aff"
            //                     selectedValue={projectName}
            //                     onValueChange={this.onValueChange2.bind(this)}
            //                 >
            //                     {/* {params.map((val, key) => {
            //                         return <Picker.Item label={val.project_name} key={key} value={val.project_name} />
            //                     })} */}
            //                 </Picker>
            //             </Item>
            //             <View style={styles.footerIcons}>
            //                 <DatePicker
            //                     defaultDate={new Date(2018, 4, 4)}
            //                     minimumDate={new Date(2018, 1, 1)}
            //                     maximumDate={new Date(2018, 12, 31)}
            //                     locale={"en"}
            //                     timeZoneOffsetInMinutes={undefined}
            //                     modalTransparent={false}
            //                     animationType={"fade"}
            //                     androidMode={"default"}
            //                     placeHolderText={<Icon name='calendar' style={styles.footerIcon} />}
            //                     textStyle={{ color: "green" }}
            //                     placeHolderTextStyle={{ color: "#d3d3d3" }}
            //                     onDateChange={this.setDate}
            //                 />
            //                 {/* <TouchableOpacity><Icon name='star' style={styles.footerIcon} /></TouchableOpacity> */}
            //                 <TouchableOpacity onPress={() => navigate('Projects')}><Text style={styles.footerCancel}>CANCEL</Text></TouchableOpacity>
            //                 <TouchableOpacity onPress={() => this.addTask()}><Text style={styles.footerAdd}>ADD</Text></TouchableOpacity>
            //             </View>
            //         </View>
            //     </View>
            // </View>
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
export default connect(mapStateToProps, undefined, mapDispatchToProps)(UpdateTask)
import * as React from 'react';
import { BackHandler, ScrollView } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Title, Content, ListItem, Text, Icon, Form, Item, Input, Label, Switch } from 'native-base';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/dist/AntDesign';
import { Wapper } from '@components'
import HTML from 'react-native-render-html';
import { toast, error } from '@app/Global';
import { connect } from 'react-redux'
import { Spinner } from '@components'
import { Languages } from '@common'
import { TaskData } from '../../services/Task'
import styles from './AddNewProjectStyle'

interface Props extends StateProps, DispatchProps {
    navigation: any
}

interface States {
    isLoading: boolean
    listName: string
}

class AddNewProject extends React.Component<Props, States> {

    // public erpNextAPi: ERPNextAPI.ERPNextAPI

    static navigationOptions = () => ({
        header: null
    })

    public _listName: any

    constructor(props: Props) {
        super(props)
        this.state = {
            listName: '',
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

    stopAndToast(msg: any) {
        toast(msg);
        error(msg);
        this.setState({ isLoading: false });
    }

    componentDidMount() {
        this._listName._root.focus();
    }

    async addTask() {
        const { navigate } = this.props.navigation;
        const { isLoading, listName } = this.state
        this.setState({ isLoading: true })
        let taskData: TaskData = TaskData.getInstance()
        try {
            await taskData.addNewProject(listName)
            navigate('Projects')
            this.setState({ isLoading: false })
        } catch (error) {
            console.log(error)
            this.stopAndToast(Languages.GetDataError)
            this.setState({ isLoading: false })
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        const { isLoading, listName } = this.state
        return (
            <ScrollView style={styles.container}>
                <View style={styles.headerArea}>
                    <View style={styles.headerIconArea}>
                        <Button transparent onPress={() => navigate('Projects')}>
                            <Icon name='arrow-back' style={styles.headerIcons} />
                        </Button>
                        <Button transparent onPress={() => this.addTask()}>
                            <Icons name='check' style={[styles.headerIcons, styles.headerIconsTick]} />
                        </Button>
                    </View>
                    <View style={styles.inputArea}>
                        <Form>
                            <Item stackedLabel>
                                <Label style={styles.listNameStyle}>List Name</Label>
                                <Input
                                    style={styles.listNameStyle}
                                    onChangeText={(listName) => this.setState({ listName })}
                                    value={listName}
                                    ref={c => this._listName = c} />
                            </Item>
                        </Form>
                    </View>
                </View>
                <View style={styles.contentArea}>
                    <Content>
                        <Text style={styles.listTitle}>List Members</Text>
                        <TouchableOpacity style={styles.ownerRow}>
                            <View style={styles.ownerIcon}><Text style={styles.iconTxt}>R</Text></View>
                            <Text style={styles.listGreyTxt}>You</Text>
                            <View style={styles.ownerTag}><Text style={styles.ownerTagTxt}>OWNER</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.invitePeople}>
                            <View style={styles.inviteIconBtn}>
                                <Icon name='add' style={styles.inviteIcon} />
                            </View>
                            <Text style={styles.inviteTxt}>Invite People</Text>
                        </TouchableOpacity>
                        <Text style={styles.listTitle}>List Option</Text>
                        <TouchableOpacity style={styles.ownerRow}>
                            <Icon name='folder-open' style={styles.listOptIcon} />
                            <Text style={styles.listGreyTxt}>Choose a Folder</Text>
                        </TouchableOpacity>
                        <View style={styles.ownerRow}>
                            <Icon name='volume-off' style={styles.listOptIcon} />
                            <Text style={styles.listGreyTxt}>Do Not Distrub</Text>
                            <Right>
                                <Switch value={false} />
                            </Right>
                        </View>
                        <View>
                            <Text styles={styles.dontTxt}>Do Not Distrub silence notifications from this list, unless you are assigned a to-do or mentioned in a comment.</Text>
                        </View>
                    </Content>
                </View>
            </ScrollView>
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
export default connect(mapStateToProps, undefined, mapDispatchToProps)(AddNewProject)
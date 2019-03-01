import * as React from 'react'
import { BackHandler, TouchableOpacity, View } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Title, Content, ListItem, Text } from 'native-base';
import { Toolbar } from 'react-native-material-ui'
import { TranslateYAndOpacity, SharedElement } from 'react-native-motion'
import { toast, error } from '@app/Global'
import Icon from 'react-native-vector-icons/Entypo'
import { Menu } from '../Header'
import HTML from 'react-native-render-html'
import { connect } from 'react-redux'
import { Languages, FormValidate } from '@common'
import { Wapper, Buttons } from '@components'
import { TaskData } from '../../services/Task'
// import * as ERPNextAPI from '../../services/erpNextAPI'
import styles from './styles'


interface Props extends StateProps, DispatchProps {
    navigation: any
}

interface States {
    isLoading: boolean
    modalVisible: boolean
    text: string
    addProject: string
    assignedMeList: any[]
    assignedMeTskCount: number
    todayList: any[]
    todayTskCount: number
    projects: any[]
    refreshing: boolean
}

class Projects extends React.Component<Props, States> {

    // public erpNextAPi: ERPNextAPI.ERPNextAPI

    static navigationOptions = () => ({
        header: null
    })

    constructor(props: Props) {
        super(props)
        this.state = {
            modalVisible: false,
            assignedMeList: [],
            assignedMeTskCount: 0,
            addProject: '',
            todayList: [],
            todayTskCount: 0,
            projects: [],
            refreshing: false,
            text: 'Add new project...',
            isLoading: false,
        }

        this.checkConnection = this.checkConnection.bind(this)
        this.stopAndToast = this.stopAndToast.bind(this)
        this.validateForm = this.validateForm.bind(this)
        // this.erpNextAPi = ERPNextAPI.ERPNextAPI.getInstance()
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
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this.feachProjects()
    }

    async feachProjects() {
        this.setState({ isLoading: true })
        let taskData: TaskData = TaskData.getInstance()
        try {
            await taskData.getTaskAndFilter()
            this.setState({ projects: taskData.projects })
            this.setState({ assignedMeList: taskData.ownProjects })
            let assignedMeTskCount = 0
            for (let item of taskData.ownProjects) {
                if (item.tasks) {
                    assignedMeTskCount = assignedMeTskCount + item.tasks.length
                }
            }
            this.setState({ assignedMeTskCount })
            this.setState({ todayList: taskData.todaysProjects })
            let todayTskCount = 0
            for (let item of taskData.todaysProjects) {
                if (item.tasks) {
                    todayTskCount = todayTskCount + item.tasks.length
                }
            }
            this.setState({ todayTskCount })
            this.setState({ isLoading: false })
        } catch (error) {
            console.log(error)
            this.stopAndToast(Languages.GetDataError)
            this.setState({ isLoading: false })
        }
    }

    handleBackButton() {
        return true;
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.feachProjects()
        this.setState({ refreshing: false });
    }

    deleteProject(key: number, val: any) {
        const { projects } = this.state
        let tempProjects = projects
        tempProjects.splice(key, 1)
        this.setState({ projects: tempProjects })
    }

    validateForm() {
        const { addProject } = this.state
        if (
            FormValidate.isEmpty(addProject)
        ) {
            return 'Please complete the form'
        }
        return undefined
    }

    async addProject() {
        const { addProject } = this.state
        this.setState({ isLoading: true })
        const _error = this.validateForm()
        if (_error) return this.stopAndToast(_error)
        let taskData: TaskData = TaskData.getInstance()
        try {
            await taskData.addNewProject(addProject)
            this.setModalVisible(!this.state.modalVisible);
            this.setState({ isLoading: false })
        } catch (error) {
            console.log(error)
            this.stopAndToast(Languages.GetDataError)
            this.setState({ isLoading: false })
        }
    }

    setModalVisible(visible: any) {
        this.setState({ modalVisible: visible });
    }

    render() {
        const { projects, assignedMeList, assignedMeTskCount, todayList, todayTskCount, isLoading, refreshing, addProject } = this.state
        const { navigate } = this.props.navigation;
        const { logout, user } = this.props
        // console.log(projects)
        return (<Container>
            <Header style={styles.headerArea}>
                <Left>
                    <TouchableOpacity style={styles.headerLeft}>
                        <View style={styles.userIcon}><Title style={styles.userIconTxt}>{user ? user.full_name[0] : 'D'}</Title></View>
                        <Title style={styles.titleTxt}>{user ? user.full_name : 'Demo'}</Title>
                    </TouchableOpacity>
                </Left>
                <Right>
                    <Button transparent>
                        <Icon name='bell' style={styles.headerIcons} />
                    </Button>
                    <Button transparent>
                        <Icon name='message' style={styles.headerIcons} />
                    </Button>
                    <Button onPress={() => { logout(); navigate('Login') }} transparent>
                        <Icon name='magnifying-glass' style={styles.headerIcons} />
                    </Button>
                </Right>
            </Header>
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.addNewBtn} onPress={() => navigate('AddNewTask', projects)}>
                    <Icon name='plus' size={20} style={styles.addIcon} />
                </TouchableOpacity>
                <Content>
                    <ListItem style={styles.listContain} icon onPress={() => navigate('DetailsToday', { title: 'Assigned to me', data: assignedMeList })}>
                        <Left>
                            <Icon name='add-user' style={[styles.listIcons, styles.assignedIcons]} />
                        </Left>
                        <Body style={styles.listBody}>
                            <Text>Assigned to me</Text>
                        </Body>
                        <Right style={styles.listCount}>
                            <Text>{assignedMeTskCount}</Text>
                        </Right>
                    </ListItem>
                    <ListItem style={styles.listContain} icon onPress={() => navigate('DetailsToday', { title: 'Today', data: todayList })}>
                        <Left>
                            <Icon name='calendar' style={[styles.listIcons, styles.todayIcons]} />
                        </Left>
                        <Body style={styles.listBody}>
                            <Text>Today</Text>
                        </Body>
                        <Right style={styles.listCount}>
                            <Text>{todayTskCount}</Text>
                        </Right>
                    </ListItem>
                    {projects.map((val, key) => {
                        return <ListItem key={key} style={styles.listContain} icon onPress={() => navigate('ProjectsDetails', val)}>
                            <Left>
                                <Icon name='list' style={styles.listIcons} />
                            </Left>
                            <Body style={styles.listBody}>
                                <Text>{val.project_name}</Text>
                            </Body>
                            <Right style={styles.listCount}>
                                <Text>{val.tasks.length}</Text>
                            </Right>
                        </ListItem>
                    })}
                    <ListItem style={styles.listContain} icon onPress={() => navigate('AddNewProject')}>
                        <Left>
                            <Icon name='plus' style={[styles.listIcons, styles.createListIcons]} />
                        </Left>
                        <Body style={styles.listBody}>
                            <Text style={styles.createlistBody}>Create List</Text>
                        </Body>
                    </ListItem>
                </Content>
            </View>
        </Container>
        )
    }
}

interface StateProps {
    netInfo: any,
    user: any
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
export default connect(mapStateToProps, undefined, mapDispatchToProps)(Projects)
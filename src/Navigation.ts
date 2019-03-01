'use strict'

import { StackNavigator } from 'react-navigation'
import { Auth, Login, Projects, ProjectsDetails, DetailsToday, AddNewProject, AddNewTask, UpdateTask } from '@screens'

const MainNavigator = StackNavigator({
    Auth: { screen: Auth },
    Login: { screen: Login },
    Projects: { screen: Projects },
    ProjectsDetails: { screen: ProjectsDetails },
    DetailsToday: { screen: DetailsToday },
    AddNewProject: { screen: AddNewProject },
    AddNewTask: { screen: AddNewTask },
    UpdateTask: { screen: UpdateTask },
}, {

    })

export default MainNavigator;
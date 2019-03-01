import { ToDo } from '../models/ToDo'
import { Project, Task } from '../models/Project'
import { ERPNextAPI } from '../services/erpNextAPI'
import * as TaskObject from '../models/Task'

export class TaskData {
    private static instance: TaskData
    public username: string
    public api: ERPNextAPI
    public projects: Project[]
    public ownProjects: Project[]
    public todaysProjects: Project[]

    constructor() {
        if (TaskData.instance) {
            throw new Error("Singleton class")
        }
        this.api = ERPNextAPI.getInstance()
        this.username = this.api.username
        this.projects = []
        this.ownProjects = []
        this.todaysProjects = []
        TaskData.instance = this
    }

    public static getInstance() {
        if (!TaskData.instance) {
            new TaskData()
        }
        return TaskData.instance
    }

    public async closeTask(taskToUpdate: Task) {
        let task: Task = await this.api.modifyResource('Task', taskToUpdate.task_id, {
            status: 'Open'
        })

        console.log('closed')
        console.log(task)
        await this.getTaskAndFilter()

        return task
    }

    public async openTask(taskToUpdate: Task) {
        let task: Task = await this.api.modifyResource('Task', taskToUpdate.task_id, {
            status: 'Open'
        })

        await this.getTaskAndFilter()

        return task
    }

    public async addNewTask(taskName: string, projectName: string) {
        let newTask: TaskObject.Task = {
            subject: taskName,
            project: projectName
        }
        let task: TaskObject.Task = await this.api.addResource('Task', newTask)
        await this.getTaskAndFilter()
        return task
    }

    public async addNewProject(projectName: string) {
        let newProject: Project = {
            project_name: projectName,
            status: 'Open'
        }
        let project: Project = await this.api.addResource('Project', newProject)

        await this.getTaskAndFilter()

        return project
    }

    public async getTaskAndFilter() {
        try {
            let projectNames: Project[] = await this.api.getResource('Project')
            for (let tempProject of projectNames) {
                let name = (tempProject.name) ? tempProject.name : ''
                let project: Project = await this.api.getResourceDetail('Project', name)
                this.projects.push(project)
            }
            let toDos: ToDo[] = await this.api.getResource('ToDo?fields=["assigned_by","creation","owner","reference_type","reference_name","date"]')
            for (let toDo of toDos) {
                if (toDo.reference_type === 'Task') {
                    let taskName = toDo.reference_name
                    let owner = toDo.owner
                    for (let project of this.projects) {
                        if (project.tasks) {
                            for (let task of project.tasks) {
                                if (task.task_id === taskName) {
                                    task.owner = owner
                                }
                            }
                        }
                    }
                }
            }

            for (let project of this.projects) {
                let tempTaskArray: Task[] = []
                if (project.tasks) {
                    for (let task of project.tasks) {
                        if (task.owner === this.username) {
                            tempTaskArray.push(task)
                        }
                    }
                }

                if (tempTaskArray.length > 0) {
                    let tempProject: Project = JSON.parse(JSON.stringify(project))
                    tempProject.tasks = tempTaskArray
                    this.ownProjects.push(tempProject)
                }
            }
        } catch (error) {
            console.log(error)
            throw Error("Error Task")
        }
    }
}
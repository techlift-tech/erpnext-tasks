'use strict'

import { AsyncStorage } from 'react-native'

export class ERPNextAPI {
  private static instance: ERPNextAPI
  public serverUrl: string
  public username: string
  public password: string

  constructor() {
    if (ERPNextAPI.instance) {
      throw new Error("Singleton class")
    }
    this.serverUrl = ''
    this.username = ''
    this.password = ''
    ERPNextAPI.instance = this
  }

  public static getInstance() {
    if (!ERPNextAPI.instance) {
      new ERPNextAPI()
    }
    return ERPNextAPI.instance
  }

  public async login(serverUrl: string, username: string, password: string) {
    this.serverUrl = serverUrl
    this.username = username
    this.password = password

    let self = this
    try {
      let loginFinalUrl = encodeURI(`${this.serverUrl}/api/method/login?usr=${this.username}&pwd=${this.password}`)
      let result = await fetch(loginFinalUrl, {
        method: 'POST'
      })

      if (result.status == 200) {
        await AsyncStorage.setItem('url', self.serverUrl)
        await AsyncStorage.setItem('cookie', String(result.headers.get("set-cookie")))
        let resultData = await result.json()
        return resultData
      } else {
        throw new Error("Login Error")
      }

    }
    catch (error) {
      console.log(error)
      throw new Error("Login Error");
    }
  }

  public async getResource(resourceName: string) {
    let self = this
    try {
      let cookie = await AsyncStorage.getItem('cookie');
      let fetchParm: RequestInit = {
        headers: {
          "cookie": cookie
        }
      }
      let finalUrl = encodeURI(`${self.serverUrl}/api/resource/${resourceName}`)
      let result = await fetch(finalUrl, fetchParm);
      if (result.status == 200) {
        let resultData = await result.json()
        return resultData.data
      }
      else {
        throw new Error("Some Error");
      }
    }
    catch (error) {
      throw error
    }
  }

  public async addResource(resourceName: string, newObject: Object){
    let self = this
    try {
      let cookieSaved = await AsyncStorage.getItem('cookie');
      let fetchParm: RequestInit = {
        headers: {
          "cookie": cookieSaved,
          "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify(newObject)
      }
      let finalUrl = encodeURI(`${self.serverUrl}/api/resource/${resourceName}`)
      let result = await fetch(finalUrl, fetchParm);
      if (result.status == 200) {
        let resultData = await result.json()
        return resultData.data
      }
      else {
        throw new Error("Some Error");
      }
    } catch (error) {
      throw error
    }
  }

  public async modifyResource(resourceName: string, resourceItemName: string, modifyObject: Object) {
    let self = this
    try {
      let cookieSaved = await AsyncStorage.getItem('cookie');
      let fetchParm: RequestInit = {
        headers: {
          "cookie": cookieSaved,
          "Content-Type": "application/json",
        },
        method: 'PUT',
        body: JSON.stringify(modifyObject)
      }
      let finalUrl = encodeURI(`${self.serverUrl}/api/resource/${resourceName}/${resourceItemName}`)
      let result = await fetch(finalUrl, fetchParm);
      if (result.status == 200) {
        let resultData = await result.json()
        return resultData.data
      }
      else {
        throw new Error("Some Error");
      }
    } catch (error) {
      throw error
    }
  }

  public async getResourceDetail(resourceName: string, resourceItemName: string) {
    let self = this
    try {
      let cookieSaved = await AsyncStorage.getItem('cookie');
      let fetchParm: RequestInit = {
        headers: {
          "cookie": cookieSaved
        }
      }
      let finalUrl = encodeURI(`${self.serverUrl}/api/resource/${resourceName}/${resourceItemName}`)
      let result = await fetch(finalUrl, fetchParm);
      if (result.status == 200) {
        let resultData = await result.json()
        return resultData.data
      }
      else {
        throw new Error("Some Error");
      }
    }
    catch (error) {
      throw error
    }
  }
}

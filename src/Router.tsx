'use strict'

import * as React from 'react'
import { View, StatusBar } from 'react-native'
import { Root } from "native-base"
import { closeDrawer } from '@app/Global'
import { Styles, Config } from '@common'
import { InternetInfo, StatusInfo, LeftDrawer } from '@components'
import Navigation from './Navigation'


interface Props { }
interface States { }

class Router extends React.Component<Props, States> {

  constructor(props: Props) {
    super(props);
  }

  navigationProps = (routeName: any, params: any) => {
    const { navigator } = this.refs;
    navigator.dispatch({ type: 'Navigation/NAVIGATE', routeName, params });
    closeDrawer();
  }


  componentDidMount() {

  }

  render() {
    return (
      <Root>
        <LeftDrawer
          navigationProps={this.navigationProps}
          pageContains={<View style={Styles.app}>
            <StatusBar hidden={Config.showStatusBar} />
            <Navigation ref={'navigator'} />
            <InternetInfo />
            <StatusInfo />
          </View>}
        /></Root>
    );
  }
}

export default Router
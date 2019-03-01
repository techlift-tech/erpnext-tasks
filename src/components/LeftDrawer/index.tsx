import * as React from 'react'
import { View, Text, LayoutAnimation, TouchableOpacity } from 'react-native';
import { Drawer } from 'native-base';
import { connect } from 'react-redux';
import SideBar from './SideBar'
import { EventEmitter, Timer } from '@app/Global';
import styles from './styles'

interface Props {
  navigationProps: any
  pageContains: any
}

interface States {

}

class LeftDrawer extends React.Component<Props, States> {

  public sideMenuOpen: any
  public sideMenuClose: any
  public drawer: any

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.sideMenuOpen = EventEmitter.addListener('sideMenuOpen', this.openDrawer)
    this.sideMenuClose = EventEmitter.addListener('sideMenuClose', this.closeDrawer)
  }

  componentWillUnmount() {
    this.sideMenuOpen.remove()
    this.sideMenuClose.remove()
  }

  closeDrawer = () => {
    this.drawer._root.close()
  };

  openDrawer = () => {
    this.drawer._root.open()
  };


  render() {
    const { pageContains, navigationProps } = this.props
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={navigationProps} />}
        onClose={() => this.closeDrawer()}
      >
        {pageContains}
      </Drawer>
    );
  }
}

export default LeftDrawer

import _EventEmitter from 'EventEmitter'
export const EventEmitter = new _EventEmitter();

import _Timer from 'react-timer-mixin'
export const Timer = _Timer;

import reactotron from 'reactotron-react-native'
export const Reactotron = reactotron;

//Drawer
export const openDrawer = () => EventEmitter.emit('sideMenuOpen');
export const closeDrawer = () => EventEmitter.emit('sideMenuClose');

export const log = (values: any) => __DEV__ && reactotron.log(values);
export const warn = (values: any) => __DEV__ && reactotron.warn(values);
export const error = (values: any) => __DEV__ && reactotron.error(values);

export const toast = (msg: any, duration: number = 4000) => {
    EventEmitter.emit('toast', msg, duration)
};
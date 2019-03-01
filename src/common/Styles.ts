import { Dimensions, Platform } from 'react-native';
import Color from './Color';
import Config from './Config';

const { height, width } = Dimensions.get('window');
const isIphoneX = Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (height === 812 || width === 812)
const ToolbarHeight = isIphoneX ? 35 : 0

let Styles = {
    width: Dimensions.get('window').width,
    height: Platform.OS !== 'ios' ? height : (height - 20),
    app: {
        flexGrow: 1,
        backgroundColor: Color.primary,
        paddingTop: ToolbarHeight,
    },
};

export default Styles;
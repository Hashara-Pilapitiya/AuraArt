import { Dimensions } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export const wp = precentage => {
    const width = deviceWidth;

    return (precentage * width) / 100;
}

export const hp = precentage => {
    const height = deviceWidth;

    return (precentage * height) / 100;
}
import {Platform, StatusBar} from 'react-native';

Platform.OS === 'ios' ?
  StatusBar.setBarStyle('light-content') :
  StatusBar.setBackgroundColor('#f4511e');
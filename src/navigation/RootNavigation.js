import * as React from 'react';
import { StackActions } from '@react-navigation/native';

export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    //navigator is not mounted
  }
}

export function goBack(){
  navigationRef.current.goBack();
}


export function push(...args) {
    navigationRef.current?.dispatch(StackActions.push(...args));
}

export function pop(...args) {
    navigationRef.current?.dispatch(StackActions.pop(...args));
}

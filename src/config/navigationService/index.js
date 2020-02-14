import {NavigationActions, StackActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function reset_0(routeName) {
  console.log('in nav serviece', routeName)

  _navigator.dispatch(
    // console.log(routeName),
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName,
        }),
      ],
    }),
  );
}

export default {
  setTopLevelNavigator,
  reset_0,
};

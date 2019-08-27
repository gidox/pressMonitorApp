import React, { Component } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { setUserData } from '../actions/user';
const width = Dimensions.get('window').width; 

class Splash extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  async componentWillMount() {
    const {
      navigation, setUserData
    } = this.props;
    try {
      // get the access token
      // const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])

      const uid = await AsyncStorage.getItem('@user');

      if (!uid || uid === '') {
        throw {};
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        // handle this however suites the flow of your app
        throw new Error(
          "Something went wrong obtaining the users access token"
        );
      }
      const graphRequest = new GraphRequest('/me', {
        accessToken: data.accessToken,
        parameters: {
          fields: {
            string: 'picture.type(large)',
          },
        },
      }, async (error, result) => {
        if (error) {
          console.error(error)
        } else {
          console.log(result.picture.data.url)
          // setSocialData(result.picture.data.)
                // create a new firebase credential with the token
            const credential = auth.FacebookAuthProvider.credential(
              data.accessToken
            );

            // login with credential
            const firebaseUserCredential = await auth()
              .signInWithCredential(credential);
            let userData = firebaseUserCredential.user.toJSON();
            userData.fbPic = result.picture.data.url;

            setUserData(userData);

            navigation.navigate('AppDrawer');
        }
      })
       new GraphRequestManager().addRequest(graphRequest).start()


    } catch (e) {
      console.log(e);
      navigation.navigate('AppDrawer');

    }
  }


  render() {
    const headerWidth =  width / 2; 

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image resizeMode='contain' source={require('../../assets/logo.png')} style={{ width:headerWidth  }}/>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.default.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserData: data => dispatch(setUserData(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);

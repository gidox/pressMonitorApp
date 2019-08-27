import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import { Title, Text, Subheading } from 'react-native-paper';
import { Form, Button, Icon } from 'native-base';
import { AccessToken, LoginManager, GraphRequestManager, GraphRequest} from "react-native-fbsdk";
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../translations/i18n';

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    paddingTop: 22,
    paddingBottom: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
})

export default class SignupSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  facebookLogin = async () => {
    const { setUserData, createPressure } = this.props;
    try {
      // LoginManager.setLoginBehavior('browser')

      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);
      console.log("despues");

      console.log(result);

      if (result.isCancelled) {
        // handle this however suites the flow of your app
        throw new Error("User cancelled request");
      }

      console.log(
        `Login success with permissions: ${result.grantedPermissions.toString()}`
      );

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        // handle this however suites the flow of your app
        throw new Error(
          "Something went wrong obtaining the users access token"
        );
      }

      // create a new firebase credential with the token
      const credential = auth.FacebookAuthProvider.credential(
        data.accessToken
      );

      // login with credential
      const firebaseUserCredential = await auth()
        .signInWithCredential(credential);

      const userData = firebaseUserCredential.user.toJSON();
      await AsyncStorage.setItem('@user', userData.uid);

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
            createPressure();
        }
      })
      new GraphRequestManager().addRequest(graphRequest).start()


    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const {
      isVisible, onSwipeComplete, bottomModal, dismiss
    } = this.props;
    return (
      <Modal
        isVisible={isVisible}
        onBackButtonPress={() => dismiss()}
        onBackdropPress={() => dismiss()}
        onSwipeComplete={() => onSwipeComplete()}
        swipeDirection={['up', 'left', 'right', 'down']}
        style={styles.bottomModal}
      >
      <View style={styles.content}>
        <Title style={{ }}>Log In</Title>
        <Subheading>{i18n.t('loginRequest')}</Subheading>
        <Form>
          <Button 
            style={{ backgroundColor: '#415a95', marginTop: 20}} 
            full rounded 
            onPress={() => {
              dismiss();
              setTimeout(() => {
                this.facebookLogin()

              },100)
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="logo-facebook" style={{ color: '#FFF' }} />

              <Text style={{ color: '#FFF', fontSize: 14 }}>{i18n.t('withFacebook')}</Text>

            </View>
          </Button>
        </Form>
      </View>
      </Modal>
    );
  }
}

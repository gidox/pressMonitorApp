import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, View } from 'react-native'
import { Icon, Container, Content } from 'native-base';
import { Button, Avatar, Title } from 'react-native-paper';
import {  LoginManager } from "react-native-fbsdk";
import { logout } from '../actions/user';
import i18n from '../translations/i18n';


class MyAccount extends Component {
  static navigationOptions = {
    header: null,
    tabBarColor: '#694fad',
    tabBarIcon: (<Icon name='person' style={{ color: '#FFF'}} />),

  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  logout = () => {
    const { logout } = this.props;
    logout();
    LoginManager.logOut();
  }

  render() {
    const { user, navigation } = this.props;
    return (
      <Container>
        <Content padder>
          <SafeAreaView/> 
          {!user.data || !user.data.uid && (
            <View>
              <Title style={{ textAlign: 'center' }}>{i18n.t('loginforuse')}</Title>
              <Button style={{ marginTop: 30 }} mode="text" onPress={() => { navigation.navigate('Home')}}>
                {i18n.t('gotohome')}
              </Button>

            </View>

          )}
          
          {user.data && user.data.uid && (
            <View>
              <View style={{ alignItems: 'center', }}>
                <Avatar.Image size={200} source={{ uri: user.data.fbPic}} />
                <Title>{i18n.t('hi')} {user.data.displayName}</Title>
                                

              </View>
                              
                              
              <Button onPress={() => this.logout()}>
                logout
              </Button>

            </View>

          )}
        </Content>
      </Container>
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
    logout: data => dispatch(logout(data)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);

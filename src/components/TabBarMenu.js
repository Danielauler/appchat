import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { habilitaInclusaoContato } from '../actions/AppActions';
import firebase from 'firebase';

const TabBarMenu = props => (
    <View style={{backgroundColor: '#000'}} >
        
        <StatusBar backgroundColor='#000'/>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{height: 55, justifyContent:'center'}}>
            <Text style={{color:'#fff',fontSize: 30, marginLeft: 20,paddingTop:20}}>OtimiZap</Text>
            </View>

            <View style={{flexDirection: 'row',marginRight:20,marginTop: 25}}>
            <View style={{justifyContent:'center',width:50, alignItems:'center'}}>
                <TouchableHighlight 
                    onPress={()=> {Actions.adicionarContato(); props.habilitaInclusaoContato()}}
                    underlayColor='#000'>
                        <Image source={require('../img/adicionar-contato.png')} />
                </TouchableHighlight>
            </View>
                <View style={{justifyContent:'center'}}>
                    <TouchableHighlight
                        onPress={
                            ()=> firebase.auth().signOut().then(()=> Actions.formLogin())
                        }>
                        <Text style={{color:'white',fontSize:20}}>Sair</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
        <TabBar {...props} style={{paddingTop: 10, backgroundColor: "#000"}}/>
    </View>
);

export default connect(null, { habilitaInclusaoContato })(TabBarMenu);

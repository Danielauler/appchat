import React, { Component } from 'react';
import {View, 
        TextInput,
        Image, 
        TouchableHighlight, 
        KeyboardAvoidingView, 
        ListView, 
        Text, 
        Platform, 
        Dimensions, 
        ScrollView,
        Keyboard
    } from 'react-native';
import { modificaMensagem, enviarMensagem, conversaUsuarioFetch } from '../actions/AppActions';
import { connect } from 'react-redux';
import _ from 'lodash';



class Conversa extends Component {

    componentWillMount() {
        this.props.conversaUsuarioFetch(this.props.contatoEmail)
        this.criaFonteDeDados(this.props.conversa)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.contatoEmail != nextProps.contatoEmail){
            this.props.conversaUsuarioFetch(nextProps.contatoEmail)
        }
        this.criaFonteDeDados(nextProps.conversa)

    }

    _enviarMensagem() {
        const { mensagem, contatoNome, contatoEmail } = this.props;

        this.props.enviarMensagem(mensagem, contatoNome, contatoEmail)
    }

    criaFonteDeDados( conversa ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !==r2 });
        this.dataSource = ds.cloneWithRows(conversa);
    }

    renderRow(texto) {
        if (texto.length == 0)  return null;

        if(texto.tipo === 'e') {
            return (
                <View style={{alignItems: 'flex-end', marginTop: 5, marginBottom: 5, marginLeft: 40}}>
                    <Text style={{fontSize: 18, color: '#000', padding:10, backgroundColor: '#dbf5b4',elevation:1}}>{texto.mensagem}</Text>
                </View>
            )
        }

        return (
            <View style={{alignItems: 'flex-start', marginTop: 5, marginBottom: 5, marginRight: 40}}>
                <Text style={{fontSize: 18, color: '#000', padding:10, backgroundColor: '#f7f7f7',elevation:1}}>{texto.mensagem}</Text>
            </View>
        )


    }

    render() {
        const { width, height } = Dimensions.get('window') 
        return(
            <KeyboardAvoidingView 
            style={{flex:1, width: width, height:height}} 
            behavior={Platform.OS == 'ios' ? "height" : 'padding'}
            keyboardVerticalOffset={Platform.OS =='ios'? 5: 80 }
            scrollEnabled={true}
            // onLayout={this._scrollEnd}
            >
                <ScrollView
                keyboardShouldPersistTaps={'always'}
                >
            
                <View style={{ flex: 1, paddingBottom: 20 }}>
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                        />
                </View>
                </ScrollView>
                <View style={{ flexDirection: 'row', height: 60}}>
                    <TextInput 
                        value={this.props.mensagem}
                        onChangeText={texto => this.props.modificaMensagem(texto) }
                        style={{ flex: 4, backgroundColor: '#fff', fontSize: 18 }}
                        />
                    <TouchableHighlight onPress={this._enviarMensagem.bind(this)} underlayColor="#fff">
                        <Image source={require('../img/send.png')} style={{resizeMode:'contain',width:60, height:60}}/>
                    </TouchableHighlight>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = state => {
    const conversa = _.map(state.ListaConversaReducer, (val, uid)=> {
        return { ...val, uid };
    });
    return({
        conversa,
        mensagem: state.AppReducer.mensagem
    })
}


export default connect(mapStateToProps, { modificaMensagem, enviarMensagem, conversaUsuarioFetch })(Conversa)
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

const SplashButtonContainer = props => {
    return (
        <View >
            <TouchableOpacity style={styles.loginButton} onPress={() => props.buttonsContainerVisibility('login')}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerButton} onPress={() => props.buttonsContainerVisibility('register')}>
                <Text style={styles.registerText}>Don't have an account? Register</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    loginButton: {
        color: 'black',
        backgroundColor: '#c6c5d1',
        height: 50,
        marginHorizontal: 80,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerButton: {
        height: 50,
        marginHorizontal: 80,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
  
    loginText: { 
        fontSize: 20,
        fontWeight: 'bold'
    },

    registerText: {
        fontSize: 15,
        color: 'red'
    }
})

export default SplashButtonContainer;
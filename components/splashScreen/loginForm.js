import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

const LoginForm = props => {
    return (
        <View >
            <TouchableOpacity style={styles.signInButton} onPress={() => props.buttonsContainerVisibility('login-complete')}>
                <Text style={styles.signInText}>SIGN IN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => props.buttonsContainerVisibility('cancel')}>
                <Text style={styles.cancelText}>Wrong place again? Go back</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    signInButton: {
        color: 'black',
        backgroundColor: '#c6c5d1',
        height: 50,
        marginHorizontal: 80,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        height: 50,
        marginHorizontal: 80,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
  
    signInText: { 
        fontSize: 20,
        fontWeight: 'bold'
    },

    cancelText: {
        fontSize: 15,
        color: 'red'
    }
})

export default LoginForm;
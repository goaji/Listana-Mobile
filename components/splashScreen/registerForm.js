import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

const RegisterForm = props => {
    return (
        <View >
            <TouchableOpacity style={styles.registerButton} onPress={() => props.buttonsContainerVisibility('register-complete')}>
                <Text style={styles.registerText}>REGISTER</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => props.buttonsContainerVisibility('cancel')}>
                <Text style={styles.cancelText}>Wrong move? Cancel</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    registerButton: {
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
  
    registerText: { 
        fontSize: 20,
        fontWeight: 'bold'
    },

    cancelText: {
        fontSize: 15,
        color: 'red'
    }
})

export default RegisterForm;
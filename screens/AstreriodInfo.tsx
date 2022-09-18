import React, { useContext } from 'react'
import { View, Text, StyleSheet, Linking, ImageBackground } from 'react-native'
import { AstroidInfoContext } from '../Context/AstroidInfoContext'
const bg = require('../assets/nasa.jpg')

export default function AsteroidInfo() {
    const { astroidInfo } = useContext(AstroidInfoContext)
    
    const { name, nasa_jpl_url, is_potentially_hazardous_asteroid } = astroidInfo
    
    const astroidID = nasa_jpl_url.split('=')[1]

    return (
        <View style={styles.asteroidContainer}>
            <ImageBackground source={bg} resizeMode='cover' style={styles.bgStyle} >
                <View style={styles.asteroidInfoWrapper}>
                    <View>
                        <Text style={styles.asteroidContainer__name}>{name}</Text>
                    </View>
                    <View>
                        <Text style={is_potentially_hazardous_asteroid ? styles.asteroidContainer__textR:styles.asteroidContainer__textG}>{is_potentially_hazardous_asteroid ? `Asteroid id ${astroidID} is potentially hazardous asteroid` :  `Asteroid id ${astroidID} is not potentially hazardous asteroid`}</Text>
                        <Text style={styles.asteroidContainer__url}>url: {nasa_jpl_url}</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    asteroidContainer: {
        flex: 1,
    },
    asteroidInfoWrapper: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#6d6c6c71",
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10
    },
    bgStyle: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    asteroidContainer__name: {
        fontSize: 25,
        color: '#ffffff',
        fontWeight: '800',
        paddingVertical: 20
    },
    asteroidContainer__icon: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderRadius: 80,
        backgroundColor: 'white'
    },
    asteroidIDLink: {
        backgroundColor: '#d3d1d1c0',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
    },
    asteroidContainer__textG:{
        color: '#b0c4de', 
        fontWeight: 'bold'
    },
    asteroidContainer__textR:{
        color: '#eb7153', 
        fontWeight: 'bold'
    },
    asteroidContainer__text: {
        fontSize: 15,
        color: '#d8bfd8',
        fontWeight: 'bold',
    },
    asteroidContainer__url: {
        fontSize: 16,
        color: '#1e90ff',
        paddingVertical: 20
    },
    containerShadow: {
        shadowColor: 'cornflowerblue',
        shadowOpacity: 0.9,
        elevation: 13,
    }
})

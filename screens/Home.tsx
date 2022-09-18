import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableHighlight } from 'react-native';
import getAstroidInfo from '../api/fetchData';
import getRandomAstroidInfo from '../api/RandomAstroidInfo';
import { tostMessage } from '../api/toastMessage';
import HomeProp from '../interface/Home';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { AstroidInfoContext } from '../Context/AstroidInfoContext';

export default function Home(props: HomeProp) {
  const [astroidId, setAstroidId] = useState('');
  const [isloading, setIsLoading] = useState(false);

  const { setAstroidInfo } = useContext(AstroidInfoContext)

  const changeHandler = (id: any) => {
    if (!isNaN(id)) {
      setAstroidId(id)
    } else {
      setAstroidId('')
      tostMessage('Invalid Input: Only Strings')
    }
  }

  const submitHandler = () => {
    if (astroidId.length > 0) {
      setIsLoading(true)
      getAstroidInfo(astroidId)
        .then(response => {
          if (response !== '404') {
            setIsLoading(false)
            setAstroidInfo(
              {
                "name": response.name,
                "nasa_jpl_url": response.nasa_jpl_url,
                "is_potentially_hazardous_asteroid": response.is_potentially_hazardous_asteroid,
              }
            )
            props.navigation.navigate('AsteroidInfo')
            setAstroidId('')
          } else {
            tostMessage('incorrect country name')
            setAstroidId('');
          }
          setAstroidId('');
        }).catch(() => {
          tostMessage('incorrect country name')
          setAstroidId('');
        })
    } else {
      setAstroidId('')
      tostMessage('Invalid Input: Please valid ID')
    }
  }

  /**
   * RandomHandler firsting getting the ID from response data
   * get the random ID from arry of ID 
   * pass that to getAstroidInfo
   */
  const RandomHandler = () => {
    setIsLoading(true)
    getRandomAstroidInfo()
      .then(response => {
        // @ts-ignore
        const arrayOfID = response["near_earth_objects"];

        // @ts-ignore
        const allAsteroidID = arrayOfID.map(obj => obj.id)
        const randomIdx = Math.floor(Math.random() * allAsteroidID.length)
        const RANDOM_ASTROID_ID = allAsteroidID[randomIdx];

        return RANDOM_ASTROID_ID
      })
      .then((randomID) => {
        getAstroidInfo(randomID)
          .then(response => {
            if (response !== '404') {
              setIsLoading(false)
              setAstroidInfo(
                {
                  "name": response.name,
                  "nasa_jpl_url": response.nasa_jpl_url,
                  "is_potentially_hazardous_asteroid": response.is_potentially_hazardous_asteroid,
                }
              )
              props.navigation.navigate('AsteroidInfo')
              setAstroidId('')
            } else {
              tostMessage('incorrect country name')
              setAstroidId('');
            }
            setAstroidId('');
          }).catch(() => {
            tostMessage('incorrect country name')
            setAstroidId('');
          })
      })
      .catch(() => {
        tostMessage('incorrect country name')
        setAstroidId('');
      })
  }

  return (
    <View style={styles.main}>
      <Spinner
        visible={isloading}
      />
      <TextInput
        placeholder='Enter Asteroid ID'
        placeholderTextColor='lightsteelblue'
        style={styles.searchInput}
        onChangeText={changeHandler}
        value={astroidId}
        keyboardType='numeric'
      />
      <TouchableHighlight
        style={styles.button}
        underlayColor="white"
        onPress={submitHandler}
      >
        <Text
          style={styles.buttonText}>
          Submit
        </Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        underlayColor="white"
        onPress={RandomHandler}
      >
        <Text
          style={styles.buttonText}>
          Random Asteroid
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#6495ed',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'aliceblue',
    borderRadius: 8,
    color: 'Black',
    paddingHorizontal: 20
  },
  buttonText: {
    fontSize: 18,
    color: 'steelblue',
    alignSelf: 'center',
    fontWeight: '800'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'lavender',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 70,
    marginBottom: 0,
    marginTop: 30,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

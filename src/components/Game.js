import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet } from 'react-native';

class Game extends React.Component{
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
    };

    randomNumbers = Array
        .from({ length: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()));

    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, current) => acc + current, 0);
        //  TODO: shuffle the random numbers

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.target}>{this.target}</Text>
                <View style={styles.randomContainer}>
                    {
                        this.randomNumbers.map((randomNumber, index) =>
                            <Text key={index} style={styles.random}>{randomNumber}</Text>
                        )
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        flex: 1,
    },
    target: {
        fontSize: 50,
        backgroundColor: '#bbb',
        marginHorizontal: 50,
        textAlign: 'center',
    },
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    random: {
        backgroundColor: '#999',
        width: 150,
        marginHorizontal: 15,
        marginVertical: 25,
        fontSize: 35,
        textAlign: 'center',
    }
});

export default Game;
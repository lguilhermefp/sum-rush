import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet } from 'react-native';

import RandomNumber from './RandomNumber';

class Game extends React.Component{
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
    };

    state = {
        selectedNumbers: [0, 4],
    };

    randomNumbers = Array
        .from({ length: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()));

    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, current) => acc + current, 0);
        //  TODO: shuffle the random numbers

    isNumberSelected = (numberIndex) => {
        return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
    }
    
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.target}>{this.target}</Text>
                <View style={styles.randomContainer}>
                    {this.randomNumbers.map((randomNumber, index) =>
                        <RandomNumber
                            key={index}
                            number={randomNumber}
                            isSelected={this.isNumberSelected(index)}
                        />
                    )}
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
});

export default Game;
import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet } from 'react-native';

import RandomNumber from './RandomNumber';

class Game extends React.Component{
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds: PropTypes.number.isRequired,
    };

    state = {
        selectedNumberIds: [],
        remainingSeconds: this.props.initialSeconds,
    };

    randomNumbers = Array
        .from({ length: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()));

    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, current) => acc + current, 0);
        //  TODO: shuffle the random numbers

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState((prevState) => {
                return { remainingSeconds: prevState.remainingSeconds-1};
            }, () => {
                if(this.state.remainingSeconds === 0){
                    clearInterval(this.intervalId);
                }
            });
        }, 1000);
    }

    componwntWillUnmount(){
        clearInterval(this.intervalId);
    }

    isNumberSelected = (numberIndex) => {
        return this.state.selectedNumberIds.indexOf(numberIndex) >= 0;
    };

    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({
            selectedNumberIds: prevState.selectedNumberIds.concat(numberIndex),
        }));
    };
    
    gameStatus = () => {
        const sumSelected = this.state.selectedNumberIds.reduce((acc, current) => {
            return acc + this.randomNumbers[current];
        }, 0);
        if(this.state.remainingSeconds === 0){
            return 'LOST';
        }
        if(sumSelected < this.target){
            return 'BEEN_PLAYED';
        }
        if(sumSelected == this.target){
            return 'WON';
        }
        if(sumSelected > this.target){
            return 'LOST';
        }
    }

    targetPanelStyle = (gameStatus) => {
        if(gameStatus == 'WON') {
            return styles.won;
        }
        if(gameStatus == 'LOST') {
            return styles.lost;
        }
    }

    render(){
        const gameStatus = this.gameStatus();
        return(
            <View style={styles.container}>
                <Text style={styles.target}>
                    {this.state.remainingSeconds}
                </Text>    
                <Text style={[
                    styles.target,
                    styles[`STATUS_${gameStatus}`]
                ]}>{this.target}</Text>
                <View style={styles.randomContainer}>
                    {this.randomNumbers.map((randomNumber, index) =>
                        <RandomNumber
                            key={index}
                            id={index}
                            number={randomNumber}
                            isDisabled={this.isNumberSelected(index) || gameStatus !== 'BEEN_PLAYED'}
                            onPress={this.selectNumber}
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
        marginTop: 30,
        marginHorizontal: 50,
        textAlign: 'center',
    },
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    STATUS_BEEN_PLAYED: {
        backgroundColor: '#bbb',
    },
    STATUS_WON: {
        backgroundColor: '#1c2',
    },
    STATUS_LOST: {
        backgroundColor: '#b80000',
    },
});

export default Game;
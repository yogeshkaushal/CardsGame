import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    FlatList,
} from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { data } from '../../utils/data'
import CardsComponent from '../reuse/CardComponent'

const CardsScreen = () => {

    interface ItemArray {
        imageName: String;
        type: number;
        activeStatus: boolean;
        id: number;
        index: number
    }

    const [previousItem, setPreviousItem] = useState<ItemArray>({})
    const [cards, setCards] = useState(data)
    const [moves, setMoves] = useState(0)
    const [gameStatus, setGameStatus] = useState(true)

    useEffect(() => {
        shuffleArray(data)
    }, [])

    useEffect(() => {

        const array = cards.filter(item => {
            return item.activeStatus == false
        })

        if (array.length == 0)
            setGameStatus(false)


    }, [cards])

    const shuffleArray = (array) => {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        setCards(array);
    }

    const onPressItem = (item: any, index: any) => {

        const itemsReplica = cards.slice()
        itemsReplica[index].activeStatus = true

        setCards(itemsReplica)

        setTimeout(() => {
            if (Object.keys(previousItem).length == 0) {
                setPreviousItem({ ...item, index: index })
            } else {

                const replica2 = cards.slice()

                if (item.type !== previousItem.type) {

                    replica2[index].activeStatus = false
                    replica2[previousItem.index].activeStatus = false

                    setCards(replica2)
                }
                setMoves(moves + 1)
                setPreviousItem({})
            }
        }, 300)

    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Text style={styles.text}>Moves: {moves}</Text>
            {gameStatus ?
                <FlatList
                    data={cards}
                    horizontal={true}
                    extraData={cards}
                    contentContainerStyle={styles.flatlist}
                    renderItem={({ item, index }) => {
                        return <CardsComponent
                            onPress={() => onPressItem(item, index)}
                            imageName={item.imageName}
                            activeStatus={item.activeStatus} />
                    }} />
                :
                <View style={styles.congratsView}>
                    <Text style={styles.congratsText}>
                        Congratulations! You have won this game in{"\n"}
                        <Text style={{ color: "red", fontSize: 20 }}>
                            {moves} moves
                        </Text>
                    </Text>
                </View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1
    },
    text: {
        alignSelf: 'center',
        margin: moderateScale(10),
        color: "#696969",
        fontSize: moderateScale(16),
        fontWeight: 'bold'
    },
    flatlist: {
        flex: 1,
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    congratsView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    congratsText: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    playAgainButton: {
        backgroundColor: '#000',
        margin: moderateScale(20),
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(20),
        borderRadius: moderateScale(5)
    }
})

export default CardsScreen;
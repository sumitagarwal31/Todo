import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, TextInput } from "react-native";

export default class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addTodoItem: '',
            search: '',
            noDataFound: false,
            filteredDataSource: [],
            list: [
                { title: "Watch movie", completed: false },
                { title: "Read Novel", completed: false }
            ],
        }
    }

    _addTodo = () => {
        const { addTodoItem } = this.state
        const list = [...this.state.list];
        list.push({ title: addTodoItem, completed: false });
        this.setState({
            list: list,
            addTodoItem:''
        })
    }

    searchFilterFunction = (text) => {
        const { list } = this.state
        if (text) {
            const newData = list.filter(
                function (item) {
                    const itemData = item.title
                        ? item.title.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            if (newData.length > 0) {
                this.setState({
                    filteredDataSource: newData,
                    search: text,
                    noDataFound: false,
                })
            } else {
                this.setState({
                    noDataFound: true,
                    search: text
                })
            }
        } else {
            this.setState({
                filteredDataSource: list,
                search: text,
                noDataFound: false,
            })
        }
    };
    _completeAction = (item, index) => {
        const list = [...this.state.list];
        this.state.list[index]['completed'] = true;
        this.setState({
            list: list
        })
    }

    _revertAction = (item, index) => {
        const list = [...this.state.list];
        this.state.list[index]['completed'] = false;
        this.setState({
            list: list
        })
    }

    _deleteAction = (item, index) => {
        const list = [...this.state.list];
        list.splice(index, 1);
        this.setState({
            list: list
        })
    }

    renderTodo = ({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                <Text
                    style={styles.itemStyle}
                    onPress={() => getItem(item)}>
                    {item.title.toUpperCase()}
                </Text>
                {!item.completed ? (
                    <TouchableOpacity style={styles.completeButton} onPress={() => this._completeAction(item, index)}>
                        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '500', fontSize: 16 }}>Complete</Text>
                    </TouchableOpacity>
                ) : (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={styles.revertButton} onPress={() => this._revertAction(item, index)}>
                                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '500', fontSize: 16 }}>Revert</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => this._deleteAction(item, index)}>
                                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '500', fontSize: 16 }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
            </View>
        );
    }


    render() {
        const { addTodoItem, search, noDataFound, filteredDataSource, list } = this.state
        return (
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            style={styles.inputStyle}
                            value={addTodoItem}
                            onChangeText={addTodoItem => this.setState({ addTodoItem })}
                            placeholder="Enter New Todo"
                            placeholderTextColor="#C0C0C0"
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                        />
                        <TouchableOpacity style={styles.signUpButton} onPress={this._addTodo}>
                            <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '500', fontSize: 16 }}>Add</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 20, flexDirection: 'row' }}>
                        <Text style={{ color: '#000', fontSize: 20, fontWeight: '600', alignSelf: 'center' }}>Todo List</Text>
                        <TextInput
                            style={styles.searchTextStyle}
                            onChangeText={(text) => this.searchFilterFunction(text)}
                            value={search}
                            underlineColorAndroid="transparent"
                            placeholder="Search Here"
                        />
                    </View>
                    <View>
                        {!noDataFound ? (
                            <FlatList
                                data={filteredDataSource.length > 0 ? filteredDataSource : list}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={this.renderTodo}
                            />
                        ) : (
                                <Text style={{ color: '#000', fontSize: 24, fontWeight: 'bold' }}>No Data Found!</Text>
                            )}
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40
    },
    container: {
        flex: 1,
        marginHorizontal: 15,
        marginTop: 15
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 6,
        height: 40,
        borderColor: '#000',
        backgroundColor: '#fff'
    },
    searchTextStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 6,
        height: 40,
        marginHorizontal: 10,
        borderColor: '#000',
        backgroundColor: '#fff'
    },
    signUpButton: {
        paddingHorizontal: 10,
        backgroundColor: '#0069D9',
        borderRadius: 4,
        height: 40,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    completeButton: {
        paddingHorizontal: 10,
        backgroundColor: '#17A2B8',
        borderRadius: 4,
        height: 40,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    revertButton: {
        paddingHorizontal: 10,
        backgroundColor: '#FFC107',
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButton: {
        paddingHorizontal: 10,
        backgroundColor: '#DC3545',
        borderRadius: 4,
        height: 40,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemStyle: {
        alignSelf: 'center',
        fontSize: 18
    },
})
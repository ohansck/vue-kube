import { createStore } from 'vuex'

export const store = createStore({
  state: {
    numOfPlayers: 0,
    gameId: '',
    fields: [],
    nextPlayer: null,
    players: [],
    winner: ''
  },
  mutations: {
    setNumOfPlayers (state, numOfPlayers) {
        state.numOfPlayers = numOfPlayers
    },
    setGameId (state, id) {
        state.gameId = id
    },
    setFields(state, fields) {
        state.fields = fields
    },
    setNextPlayer(state, nextPlayer) {
        state.nextPlayer = nextPlayer
    },
    setPlayers(state, players) {
        state.players = players
    },
    setWinner(state, winner) {
        state.winner = winner
    },
  },
  actions: {
    // increment (context) {
    //   context.commit('increment')
    // }
  }
})

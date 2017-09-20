import * as dataImport from '../actions/getShakespeareData';

const GET_DATA = 'GET_DATA';
const GET_DATA_PENDING = 'GET_DATA_PENDING';
const GET_DATA_FULFILLED = 'GET_DATA_FULFILLED';

const initialState = {
  data: [],
  loading: false
}

export default function shakespeareReducer(state = initialState, action) {
  switch(action.type) {
    case GET_DATA_PENDING:
      return Object.assign({}, state, {loading: true})

    case GET_DATA_FULFILLED:
      return Object.assign({}, state, {loading: false, getData: action.payload})

    default:
      return state
  }
}

export function getShakespeareData() {
  return {
    type: GET_DATA,
    payload: dataImport.getShakespeareData()
  }
}
import { combineReducers } from 'redux'
import { configData } from './configReducers'
import { currentLayerData } from "./currentLayerReducer";

export default combineReducers({
  configData,
  currentLayerData,
})

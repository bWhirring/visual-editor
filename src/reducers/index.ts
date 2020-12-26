import { combineReducers } from 'redux'
import { configData, baseConfigData } from './configReducers'
import { currentLayerData } from "./currentLayerReducer";

export default combineReducers({
  configData,
  baseConfigData,
  currentLayerData,
})

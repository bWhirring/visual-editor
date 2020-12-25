let data = {

}

export function currentLayerData(state = data, action) {
  switch (action.type) {
    case 'LAYER':
      return action.data

    default:
      return state
  }
}

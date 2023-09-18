const initState = {
    settrip_type: ['0-1'],
    settrip_time: ['1-1'],
    setlandscape_type:['ziran'],
    setlandscape_compact: 1,
    setlandscape_loose: 1,
    setdemand_type: ['challenge'],
    setdemand_compact: 1,
    setdemand_loose: 1,
    setpath_min:2,
    setpath_max:8,
    setpath_hot: 1,
    setpath_service: 1,
    setpath_challenge: 1,
    setpath_weather:1
}
export default function trajReducer(preState = initState, action) {
    const { type, data } = action
    switch (type) {
        case 'settrip_type':
            return {...preState, settrip_type: data }
        case 'settrip_time':
            return {...preState, settrip_time: data }
        case 'setlandscape_type':
            return {...preState, setlandscape_type: data }
        case 'setlandscape_compact':
            return {...preState, setlandscape_compact: data }
        case 'setlandscape_loose':
            return {...preState, setlandscape_loose: data }
        case 'setdemand_type':
            return {...preState, setdemand_type: data }
        case 'setdemand_compact':
            return {...preState, setdemand_compact: data }
        case 'setdemand_loose':
            return {...preState, setdemand_loose: data }
        case 'setpathmin':
            return {...preState, setpath_min: data }
        case 'setpathmax':
            return {...preState, setpath_max: data }
        case 'setpath_hot':
            return {...preState, setpath_hot: data }
        case 'setpath_service':
            return {...preState, setpath_service: data }
        case 'setpath_challenge':
            return {...preState, setpath_challenge: data }
        case 'setpath_weather':
            return {...preState, setpath_weather: data }
        default:
            return preState;
    }
}
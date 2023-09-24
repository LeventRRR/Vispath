const initState = {
    settrip_type: '0-1',
    settrip_time: '1-1',
    setlandscape_type:['ziran'],
    setlandscape_compact: 2,
    setlandscape_loose: 2,
    setdemand_type: ['challenge'],
    setdemand_compact: 2,
    setdemand_loose: 2,
    setpath_min:2,
    setpath_max:8,
    setpath_hot: 1,
    setpath_service: 1,
    setpath_challenge: 1,
    setpath_weather:1,
    setHistory: []
}
export default function trajReducer(preState = initState, action) {
    const { type, data } = action
    switch (type) {
        case 'settrip_type':
            return {...preState, 
                settrip_type: data,
                setHistory: [...preState.setHistory, {type: 'setdemand_type', value: data}]
            }
        case 'settrip_time':
            return {...preState, 
                settrip_time: data,
                setHistory: [...preState.setHistory, {type: 'settrip_time', value: data}]
            }
        case 'setlandscape_type':
            return {...preState, 
                setlandscape_type: data,
                setHistory: [...preState.setHistory, {type: 'setlandscape_type', value: data}]
            }
        case 'setlandscape_compact':
            return {...preState, 
                setlandscape_compact: data,
                setHistory: [...preState.setHistory, {type: 'setlandscape_compact', value: data}]
            }
        case 'setlandscape_loose':
            return {...preState, 
                setlandscape_loose: data,
                setHistory: [...preState.setHistory, {type: 'setlandscape_loose', value: data}]
            }
        case 'setdemand_type':
            return {...preState, 
                setdemand_type: data,
                setHistory: [...preState.setHistory, {type: 'setdemand_type', value: data}]
            }
        case 'setdemand_compact':
            return {...preState, 
                setdemand_compact: data,
                setHistory: [...preState.setHistory, {type: 'setdemand_compact', value: data}]
            }
        case 'setdemand_loose':
            return {...preState, 
                setdemand_loose: data,
                setHistory: [...preState.setHistory, {type: 'setdemand_loose', value: data}]
            }
        case 'setpathmin':
            return {...preState, 
                setpath_min: data,
                setHistory: [...preState.setHistory, {type: 'setpathmin', value: data}]
            }
        case 'setpathmax':
            return {...preState, 
                setpath_max: data,
                setHistory: [...preState.setHistory, {type: 'setpathmax', value: data}]
            }
        case 'setpath_hot':
            return {...preState, 
                setpath_hot: data,
                setHistory: [...preState.setHistory, {type: 'setpath_hot', value: data}]
            }
        case 'setpath_service':
            return {...preState, 
                setpath_service: data,
                setHistory: [...preState.setHistory, {type: 'setpath_service', value: data}]
            }
        case 'setpath_challenge':
            return {...preState, 
                setpath_challenge: data,
                setHistory: [...preState.setHistory, {type: 'setpath_challenge', value: data}]
            }
        case 'setpath_weather':
            return {...preState, 
                setpath_weather: data,
                setHistory: [...preState.setHistory, {type: 'setpath_weather', value: data}]
            }
        default:
            return preState;
    }
}
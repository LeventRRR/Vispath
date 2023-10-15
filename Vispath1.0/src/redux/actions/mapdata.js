

export const settrip_type = data => ({ type: 'settrip_type', data: data })
export const settrip_time = data => ({ type: 'settrip_time', data: data })
export const setlandscape_type = data => ({ type: 'setlandscape_type', data: data })
export const setlandscape_compact = data => ({ type: 'setlandscape_compact', data: data })
export const setlandscape_loose = data => ({ type: 'setlandscape_loose', data: data })
export const setdemand_type = data => ({ type: 'setdemand_type', data: data })
export const setdemand_compact = data => ({ type: 'setdemand_compact', data: data })
export const setdemand_loose = data => ({ type: 'setdemand_loose', data: data })
export const setpathmin = data => ({ type: 'setpathmin', data: data })
export const setpathmax = data => ({ type: 'setpathmax', data: data })
export const setPathValues = (minValue, maxValue) => ({
    type: 'set_path_values', 
    data: {
      min: minValue,
      max: maxValue
    }
  });
export const setpath_hot = data => ({ type: 'setpath_hot', data: data })
export const setpath_service = data => ({ type: 'setpath_service', data: data })
export const setpath_challenge = data => ({ type: 'setpath_challenge', data: data })
export const setpath_weather = data => ({ type: 'setpath_weather', data: data })

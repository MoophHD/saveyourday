export default function dateSecConverter(value, separator=':') {
    let result;
    if(typeof value == 'number') {
      result = [];
      let hr = value/3600|0;
      let mn = (value-hr*3600)/60|0;
      let sc = value%60;
      
      result = result.concat(hr, mn, sc);
      
      if (separator) return result.join(separator);
      
      return result
    } else if (typeof value == 'object'||'string' && separator !== undefined) {
      if (typeof value == 'string') value = value.split(separator);
      result = 0;
  
      result += value[0] * 3600;
      result += value[1] * 60;
      result += parseInt(value[2]);
  
      return result;
  
    }
  }
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let oTime = {
    'M+': date.getMonth(),
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in oTime) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = oTime[k];
      fmt = fmt.replace(RegExp.$1, (str < 10 ? '0' + str : str));
    }
  }
  return fmt;
};

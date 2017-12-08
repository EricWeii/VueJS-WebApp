/**
 * 解析url参数
 * @example ?id=123456&a=b
 * @return Object {id: 123456, a: b}
 */
export function urlParse () {
  let url = window.location.search;
  let obj = {};

  if (url) {
    url.substring(1).split('&').forEach((item) => {
      let tempArr = item.split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }

  return obj;
}

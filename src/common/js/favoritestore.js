export function saveToLocal (id, key, val) { // 存储缓存数据
  let seller = window.localStorage.__seller__;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller.id) {
      seller[id] = {};
    }
  }
  seller[id][key] = val;
  window.localStorage.__seller__ = JSON.stringify(seller);
};

export function loadFromLocal (id, key, def) { // 读取缓存数据
  let seller = window.localStorage.__seller__;

  if (!seller) {
    return def;
  }

  let sellerId = JSON.parse(seller)[id];
  if (!sellerId) {
    return def;
  }
  let favoriteVal = sellerId[key];
  return favoriteVal || def;
}

var propertyTypes = {
  "HDB": "组屋",
  "Condo": "公寓",
  "Landed": "别墅"
};

var roomTypes = {
  "master": "主人房",
  "common": "普通房",
  "other": "其他"
};

var roomNum = {
  "1": "一间房",
  "2": "两间房",
  "3": "三间房",
  "4": "四间房",
  "5": "五间房",
  "6": "大于五间房"
}

var priceRange = {
  "500": "< $500",
  "1000": "< $1,000",
  "2000": "< $2,000",
  "3000": "< $3,000",
  "4000": "< $4,000",
  "10000": "< $10,000"
}

// correspond to properties_col status allowd allowedValues
var userPropertyStatus = {
  "open": "发布中",
  "closed": "不公开",
  "deal": "已成交"
}

var adminPropertyStatus = {
  "open": "发布中",
  "closed": "不公开",
  "deal": "已成交",
  "expired": "过期",
  "violate": "违规"
}


var agencyList = {
  "DWG"       : "DWG",
  "ERA"       : "ERA",
  "OrangeTee" : "OrangeTee",
  "SLP"       : "SLP",
  "Huttons"   : "Huttons",
  "PropNex"   : "PropNex",
  "HSR"       : "HSR"
};

var propertyFacilities = {
  "hasFurniture": "家具齐全",
  "furnished": "精装修",
  "noLandlord": "无房东",
  "aircon": "空调",
  "washer": "洗衣机",
  "dryer": "烘干机",
  "fridge": "冰箱",
  "internet": "网络",
  "microwave": "微波炉",
  "allowCooking": "可煮",
  "swimmingPool": "游泳池",
  "tennisCourt": "网球场",
  "balcony": "阳台",
  "parkingSlot": "停车场",
  "gym": "健身房"
};

var favPropertyFacilities = {
  "hasFurniture": "家具齐全",
  "furnished": "精装修",
  "noLandlord": "无房东",
  "allowCooking": "可煮",
  "aircon": "空调",
  "washer": "洗衣机"
};

Config.getFacilities = function(){
  return propertyFacilities;
};

Config.getFavFacilities = function(){
  return favPropertyFacilities;
};

Config.getPropertyTypes = function(){
  return propertyTypes;
}

Config.getRoomTypes = function(){
  return roomTypes;
}

Config.getAgency = function(line){
  return agencyList;
};

Config.getAllPropertyStatus = function(){
  return userPropertyStatus;
}

Config.getAdminPropertyStatus = function(){
  return adminPropertyStatus;
}

Config.getRoomNum = function(){
  return roomNum;
}

Config.getPriceRange = function(){
  return priceRange;
}

Config.getMaxImageUploaded = function(){
  return 12;
}

Config.getMaxImageSize = function(){
  return 2; // Metric: MB
}

Config.getBedroomNum = function(){
  return [1,2,3,4,5,6,7];
}

Config.getBathroomNum = function(){
  return [1,2,3,4];
}


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
  "open": "已发布",
  "closed": "关闭",
  "deal": "已成交"
}

var adminPropertyStatus = {
  "open": "已发布",
  "closed": "关闭",
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

Config.getFacilities = function(){
  return propertyFacilities;
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

Config.getPriceRange = function(){
  return priceRange;
}

Config.getMaxImageUploaded = function(){
  return 12;
}

Config.getMaxImageSize = function(){
  return 2; // Metric: MB
}


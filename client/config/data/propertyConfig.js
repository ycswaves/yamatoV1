var propertyTypes = {
  "HDB": "hdb",
  "Condo": "condo",
  "Landed": "landed"
};

var roomTypes = {
  "master": "master_room",
  "common": "common_room",
  "other": "other_room"
};

var roomNum = {
  "1": "one_bedroom",
  "2": "two_bedroom",
  "3": "three_bedroom",
  "4": "four_bedroom",
  "5": "five_bedroom",
  "6": "more_than_five_bedroom"
};

var priceRange = {
  "500": "< $500",
  "1000": "< $1,000",
  "2000": "< $2,000",
  "3000": "< $3,000",
  "4000": "< $4,000",
  "10000": "< $10,000"
};

// correspond to properties_col status allowd allowedValues
var userPropertyStatus = {
  "open": "open",
  "closed": "closed",
  "deal": "deal"
}

var adminPropertyStatus = {
  "open": "open",
  "closed": "closed",
  "deal": "deal",
  "expired": "expired",
  "violate": "violate"
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
  "hasFurniture": "has_furniture",
  "furnished": "furnished",
  "noLandlord": "no_landlord",
  "aircon": "aircon",
  "washer": "washer",
  "dryer": "dryer",
  "fridge": "fridge",
  "internet": "internet",
  "microwave": "microwave",
  "allowCooking": "allow_cooking",
  "swimmingPool": "swimming_pool",
  "tennisCourt": "tennis_court",
  "balcony": "balcony",
  "parkingSlot": "parking_slot",
  "gym": "gym"
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


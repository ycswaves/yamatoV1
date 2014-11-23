var salesList = {
  "furniture": {
    "niceName": "家具",
    "category": {
      "safa" : "沙发",
      "bed" : "床架",
      "textile" : "床上用品",
      "mattress" : "床垫",
      "wardrobe" : "衣橱",
      "console" : "电视柜",
      "table" : "桌台",
      "chair" : "椅子",
      "cabinet" : "柜橱",
      "other" : "其他"
    }
  },
  "household": {
    "niceName": "家居用品及装饰品",
    "category": {
      "bathroom" : "卫生间用具",
      "carpet" : "地毯",
      "curtain" : "窗帘及百叶窗",
      "light" : "灯具",
      "clock" : "时钟",
      "mirror" : "镜子",
      "decoration" : "装饰品",
      "dinnerware" : "厨具及餐具",
      "other" : "其他"
    }
  },
  "appliance": {
    "niceName": "家用电器",
    "category": {
      "fan" : "风扇",
      "coffeemaker" : "咖啡机",
      "dishwasher" : "洗碗机",
      "microwave" : "微波炉",
      "fridge" : "冰箱",
      "oven" : "烤箱",
      "heater" : "热水器及净化器",
      "washingmachine" : "洗衣机",
      "vacuumcleaner" : "吸尘器",
      "other" : "其他"
    }
  },
  "other": {
    "niceName": "其他家庭用品",
    "category": {
      "fan" : "其他"
    }
  }
}

Config.getSales = function(){
  return salesList;
};

Config.getSubByCategory = function(cat){
  if(cat == undefined) cat = 'furniture';
  return salesList[cat.toLowerCase()].category || salesList.furniture.category;
};
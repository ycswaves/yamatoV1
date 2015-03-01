var districtList = {
  "D01": "Boat Quay / Raffles Place / Marina",
  "D02": "Chinatown / Tanjong Pagar",
  "D03": "Alexandra / Commonwealth",
  "D04": "Harbourfront / Telok Blangah",
  "D05": "Buona Vista / West Coast / Clementi New Town",
  "D06": "City Hall / Clarke Quay",
  "D07": "Beach Road / Bugis / Rochor",
  "D08": "Farrer Park / Serangoon Rd",
  "D09": "Orchard / River Valley",
  "D10": "Tanglin / Holland",
  "D11": "Newton / Novena",
  "D12": "Balestier / Toa Payoh",
  "D13": "Macpherson / Potong Pasir",
  "D14": "Eunos / Geylang / Paya Lebar",
  "D15": "East Coast / Marine Parade",
  "D16": "Bedok / Upper East Coast",
  "D17": "Changi Airport / Changi Village",
  "D18": "Pasir Ris / Tampines",
  "D19": "Hougang / Punggol / Sengkang",
  "D20": "Ang Mo Kio / Bishan / Thomson",
  "D21": "Clementi Park / Upper Bukit Timah",
  "D22": "Boon Lay / Jurong / Tuas",
  "D23": "Bukit Batok / Bukit Panjang",
  "D24": "Choa Chu Kang / Tengah",
  "D25": "Admiralty / Woodlands",
  "D26": "Mandai / Upper Thomson",
  "D27": "Sembawang / Yishun",
  "D28": "Seletar / Yio Chu Kang"
};

var postalDistrict = {
  "D01": "01,02,03,04,05,06",
  "D02": "07,08",
  "D03": "14,15,16",
  "D04": "09,10",
  "D05": "11,12,13",
  "D06": "17",
  "D07": "18,19",
  "D08": "20,21",
  "D09": "22,23",
  "D10": "24,25,26,27",
  "D11": "28,29,30",
  "D12": "31,32,33",
  "D13": "34,35,36,37",
  "D14": "38,39,40,41",
  "D15": "42,43,44,45",
  "D16": "46,47,48",
  "D17": "49,50,81",
  "D18": "51,52",
  "D19": "53,54,55,82",
  "D20": "56,57",
  "D21": "58,59",
  "D22": "60,61,62,63,64",
  "D23": "65,66,67,68",
  "D24": "69,70,71",
  "D25": "72,73",
  "D26": "77,78",
  "D27": "75,76",
  "D28": "79,80"
};

var mrtList = {
  "NS": {
    "niceName": "north_south",
    "stations": {
      "NS1" : "Jurong East",
      "NS2" : "Bukit Batok",
      "NS3" : "Bukit Gombak",
      "NS4" : "Choa Chu Kang",
      "NS5" : "Yew Tee",
      "NS7" : "Kranji",
      "NS8" : "Marsiling",
      "NS9" : "Woodlands",
      "NS10": "Admiralty",
      "NS11": "Sembawang",
      "NS13": "Yishun",
      "NS14": "Khatib",
      "NS15": "Yio Chu Kang",
      "NS16": "Ang Mo Kio",
      "NS17": "Bishan",
      "NS18": "Braddell",
      "NS19": "Toa Payoh",
      "NS20": "Novena",
      "NS21": "Newton",
      "NS22": "Orchard",
      "NS23": "Somerset",
      "NS24": "Dhoby Ghaut",
      "NS25": "City Hall",
      "NS26": "Raffles Place",
      "NS27": "Marina Bay"
    }
  },

  "EW": {
    "niceName": "east_west",
    "stations": {
      "EW1" : "Pasir Ris",
      "EW2" : "Tampines",
      "EW3" : "Simei",
      "EW4" : "Tanah Merah",
      "EW5" : "Bedok",
      "EW6" : "Kembangan",
      "EW7" : "Eunos",
      "EW8" : "Paya Lebar",
      "EW9" : "Aljunied",
      "EW10": "Kallang",
      "EW11": "Lavendar",
      "EW12": "Bugis",
      "EW13": "City Hall",
      "EW14": "Raffles Place",
      "EW15": "Tanjong Pagar",
      "EW16": "Outram Park",
      "EW17": "Tiong Bahru",
      "EW18": "Redhill",
      "EW19": "Queenstown",
      "EW20": "Commonwealth",
      "EW21": "Buona Vista",
      "EW22": "Dover",
      "EW23": "Clementi",
      "EW24": "Jurong East",
      "EW25": "Chinese Garden",
      "EW26": "Lakeside",
      "EW27": "Boon Lay",
      "EW28": "Pioneer",
      "EW29": "Joo Koon"
    }
  },

  "NE": {
    "niceName": "north_east",
    "stations": {
      "NE1" : "HarbourFront",
      "NE3" : "Outram Park",
      "NE4" : "Chinatown",
      "NE5" : "Clarke Quay",
      "NE6" : "Dhoby Ghaut",
      "NE7" : "Little India",
      "NE8" : "Farrer Park",
      "NE9" : "Boon Keng",
      "NE10": "Potong Pasir",
      "NE11": "Woodleigh",
      "NE12": "Serangoon",
      "NE13": "Kovan",
      "NE14": "Hougang",
      "NE15": "Buangkok",
      "NE16": "Sengkang",
      "NE17": "Punggol"
    }
  },

  "CC": {
    "niceName": "circle_line",
    "stations": {
      "CC1" : "Dhoby Ghaut",
      "CC2" : "Bras Basah",
      "CC3" : "Esplanade",
      "CC4" : "Promenade",
      "CC5" : "Nicoll Highway",
      "CC6" : "Stadium",
      "CC7" : "Mountbatten",
      "CC8" : "Dakota",
      "CC9" : "Paya Lebar",
      "CC10": "MacPherson",
      "CC11": "Tai Seng",
      "CC12": "Bartley",
      "CC13": "Serangoon",
      "CC14": "Lorong Chuan",
      "CC15": "Bishan",
      "CC16": "Marymount",
      "CC17": "Caldecott",
      "CC18": "Bukit Brown",
      "CC19": "Botanic Gardens",
      "CC20": "Farrer Road",
      "CC21": "Holland Village",
      "CC22": "Buona Vista",
      "CC23": "One-North",
      "CC24": "Kent Ridge",
      "CC25": "Haw Par Villa",
      "CC26": "Pasir Panjang",
      "CC27": "Labrador Park",
      "CC28": "Telok Blangah",
      "CC29": "HarbourFront"
    }
  },

  "DT": {
    "niceName": "downtown_line",
    "stations": {
      "DT14": "Bugis",
      "DT15": "Promenade",
      "DT16": "Bayfront",
      "DT17": "Downtown",
      "DT18": "Telok Ayer",
      "DT19": "Chinatown"
    }
  }
};

Config = {};

Config.getDistrict = function(){
  return districtList;
};

Config.getDistrictByPostal = function(postcode){
  var postSector = postcode.substr(0,2);
  for(var districtCode in postalDistrict){
    if(postalDistrict[districtCode].indexOf(postSector) > -1){
      return districtCode;
    }
  }
  return false;
}

Config.getMRT = function(){
  return mrtList;
};

Config.getStationsByLine = function(line){
  if(line == undefined) line = 'NS';
  return mrtList[line.toUpperCase()].stations || mrtList.NS.stations;
};

Config.getStationCodeByName = function(name){
  for(var lineCode in mrtList){
    for(var mrtCode in mrtList[lineCode]['stations']){
      if(mrtList[lineCode]['stations'][mrtCode] == name){
        return {stationCode: mrtCode, lineCode: lineCode};
      }
    }
  }
  return false;
}
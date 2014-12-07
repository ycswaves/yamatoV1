var adminUserStatus = {
  "active" : "正常",
  "blocked": "封停"
}

Config.getAdminUserStatus = function(){
  return adminUserStatus;
}
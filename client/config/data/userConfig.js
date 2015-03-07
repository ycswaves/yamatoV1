var adminUserStatus = {
  "active" : "user_active",
  "blocked": "user_blocked"
}

Config.getAdminUserStatus = function(){
  return adminUserStatus;
}
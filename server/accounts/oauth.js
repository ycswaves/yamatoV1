if(process.env.SERVER == 'live'){
  ServiceConfiguration.configurations.remove({
    service: "facebook"
  });
  ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: "302468273285582",
    secret: "8b1f3e7f78e7a313fa6e361be8c1d330"
  });

  ServiceConfiguration.configurations.remove({
    service: "google"
  });
  ServiceConfiguration.configurations.insert({
    service: "google",
    clientId: "1011915789947-nf7onsh2q8n2o82k88hkb3ndikt34eqk.apps.googleusercontent.com",
    secret: "15pVqclxZinW6glir-8MdX8w"
  });
}
else {
  ServiceConfiguration.configurations.remove({
    service: "facebook"
  });
  ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: "424517704355087",
    secret: "971542dfc3c0f251cac8e4fd9e5cd2d9"
  });

  ServiceConfiguration.configurations.remove({
    service: "google"
  });
  ServiceConfiguration.configurations.insert({
    service: "google",
    clientId: "1011915789947-qfptl7uvbuo7q6n9qbtuf3bh1pdmisj5.apps.googleusercontent.com",
    secret: "h4odK9YeDOHgN_g2oCJi21B6"
  });
}
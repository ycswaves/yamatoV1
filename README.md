## Let the party begin @19/06/2014

- version 0.0.0

## 功能汇总 （Draft）
1.  租房(，搬家，家具买卖，家政)
2.  注册，登陆
3.  多样性搜索条(房间，价格，地域，类型)
4.  反向推送
5.  询问提示(邮件，短信)
6.  用户体验设计

===========================================================
Common files:
- `collections/validateionMessage.js`
  - stores all error messages (non-chinese error message is currently not used in UI).
  - new error messages should be added to this file **ONLY**.
- `config/formOpts.js`
  - stores all the form options for `<selection>`, can be used in both 'Search' and 'Add property'to guarantee consistancy.
  - `Config` is a global variable defined here, use the defined 'get' functions to get options.
- `config/reactiveDS.js` (may consider another folder other than 'config')
  - `ReactiveDS` is a Session-like object. Example:

  ```JavaScript
    ReactiveDS.set('mrtline', Config.getStationsByLine(mrtLine));
    ReactiveDS.get('mrtline');
  ```

- `helpers/handlebarHelpers.js`
  - handlerbar syntax extension, e.g `{{#arrayify}}`, for iterate a Object's properties. (Lastest Handlerbar.js support `@key`, but not in Meteor.js yet)

Reminder:
- `collections/images_col.js` is not using SimpleSchema because of CollectionFS

- Form error message placement is tightly coupled with `<div class="form-control">` using `id` attribute, and is mapped at the client-side JS file by `var formErrDivID` object. This is because SimpleSchema validation failure will return attribute name of the field with error, so that's the only clue to refer back to where the error occurs. So **Any changes to the div id in `<template name="addProperty">` requires updates on `var formErrDivID` too**

- Contact info in 'add property' form directly uses similar schema like `Schema.UserProfile` in `users_col.js`. **Any updates on `Schema.UserProfile` requires updates on

- Every new collection added should has a `subscribe` call in `client/subscriptions.js` and `publish` call in `server/publications.js`.
  - Also remember to set permissions for the collection like below:

  ```JavaScript
  Images.allow({
    insert: function(userId) {
      return true;
    },
    update: function(userId) {
      return !!userId;
    },
    update: function(userId) {
      return !!userId;
    },
    remove: function(userId) {
      return !!userId;
    }
  });
  ```

  - Actions like `insert`, `update`, `edit` will need Meteor.call() because these actions involving DB modification, thus can only be done on server-side

## Add new module in Meteor Project
- Client Side
  1. Create view html file and include html in `<template name="templ_name"></template>`.
  2. Create view js file and define `template.templ_name.events()`, `template.templ_name.helpers()` or Iron-router controllers.
  3. Add route in `router.js` and check if filter need to apply.
  4. Add subscription in `subscriptions.js` if new collection is added

- Server Side
  1. Create `Meteor.method()` for the client side JS to make `Meteor.call()`. Normally the defined methods involve database operation
  2. Add publication in `publications.js` if new collection is added

- Collection
  1. Create `SimpleSchema` for newly added collection

## To Dos
- Image uploading file size limit
- AWS S3 public folder
- Image preprocessing
  - dimension resize
  - watermark
  - limit number of images user can upload
- Explore app testing solution

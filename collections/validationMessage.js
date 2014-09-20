//SimpleSchema.debug = true; //TODO: to be removed upon deployment

SimpleSchema.messages({
  required: "请填写[label]",//"[label] is required",
  minString: "[label]不少于[min]个字符", //"[label] must be at least [min] characters",
  maxString: "[label]不超过[max]个字符", //"[label] cannot exceed [max] characters",
  minNumber: "[label]必须大于[min]",//"[label] must be at least [min]",
  maxNumber: "[label]不能超过[max]",//"[label] cannot exceed [max]",
  minDate: "[label]不能早于[min]",//"[label] must be on or before [min]",
  maxDate: "[label]不能晚于[min]",//"[label] cannot be after [max]",
  minCount: "You must specify at least [minCount] values",
  maxCount: "You cannot specify more than [maxCount] values",
  noDecimal: "[label]必须为整数",//"[label] must be an integer",
  notAllowed: "[value]是无效的值",//"[value] is not an allowed value",
  expectedString: "[label] must be a string",
  expectedNumber: "[label]必须为数字",//"[label] must be a number",
  expectedBoolean: "[label] must be a boolean",
  expectedArray: "[label] must be an array",
  expectedObject: "[label] must be an object",
  expectedConstructor: "[label] must be a [type]",
  regEx: [
    {msg: "不是有效的[label]"},
    {exp: SimpleSchema.RegEx.Email, msg: "不是有效的[label]"}, //"[label] must be a valid e-mail address"},
    {exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] must be a valid e-mail address"},
    {exp: SimpleSchema.RegEx.Domain, msg: "[label] must be a valid domain"},
    {exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] must be a valid domain"},
    {exp: SimpleSchema.RegEx.IP, msg: "[label] must be a valid IPv4 or IPv6 address"},
    {exp: SimpleSchema.RegEx.IPv4, msg: "[label] must be a valid IPv4 address"},
    {exp: SimpleSchema.RegEx.IPv6, msg: "[label] must be a valid IPv6 address"},
    {exp: SimpleSchema.RegEx.Url, msg: "[label] must be a valid URL"},
    {exp: SimpleSchema.RegEx.Id, msg: "[label] must be a valid alphanumeric ID"}
  ],
  keyNotInSchema: "[label] is not allowed by the schema"
});
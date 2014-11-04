//momentjs设置成中文
moment.locale('cn', {
    months : "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
    monthsShort : "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
    weekdays : "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
    weekdaysShort : "周日_周一_周二_周三_周四_周五_周六".split("_"),
    weekdaysMin : "日_一_二_三_四_五_六".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: "[今天] LT",
        nextDay: '[明天] LT',
        nextWeek: 'dddd [下周] LT',
        lastDay: '[昨天] LT',
        lastWeek: 'dddd [上周] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "%s后",
        past : "%s",
        s : "刚刚",
        m : "%d分钟前",
        mm : "%d分钟前",
        h : "%d小时前",
        hh : "%d小时前",
        d : "%d天前",
        dd : "%d天前",
        M : "%d月前",
        MM : "%d月前",
        y : "%d年前",
        yy : "%d年前"
    },
    ordinal : function (number) {
        return number;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
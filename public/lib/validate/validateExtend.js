//（中国大陆）手机号码验证
$.validator.addMethod('_phone_cn', function (value, element, param) {
    var reg = /^1[3,4,5,8]\d{9}$/;
    return this.optional(element) || reg.test(value);
}, '手机号码格式不正确');

//（中国大陆）座机号码验证
$.validator.addMethod('_tel_cn', function (value, element, param) {
    var reg = /^(0\d{2,3}-\d{7,8}-\d{1,4})|(0\d{2,3}-\d{7,8})$/;
    return this.optional(element) || reg.test(value);
}, '电话号码格式不正确');

//（中国大陆）身份证号码验证
$.validator.addMethod('_cardid_cn', function (value, element, param) {
    
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    var tip = "";
    var pass = true;

    if (!(value.length == 15 || value.length == 18)) {
        pass = false;
    }
    else if (!/^((\d{8}((0[1-9])|(10|11|12))((0[1-9])|((1|2)[0-9])|(3(0|1)))[0-9]{3})|(\d{6}(18|19|20)?\d{2}((0[1-9])|(10|11|12))((0[1-9])|((1|2)[0-9])|(3(0|1)))\d{3}(\d|X)))$/i.test(value)) {
        tip = "身份证号格式错误";
        pass = false;
    }
    else if (!city[value.substr(0, 2)]) {
        tip = "地址编码错误";
        pass = false;
    }
    else {
        //18位身份证需要验证最后一位校验位
        if (value.length == 18) {
            value = value.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = value[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];

            if (parity[sum % 11] != value[17]) {
                tip = "校验位错误";
                pass = false;
            }
        }
    }

    return this.optional(element) || pass;

}, '身份证号码格式不正确');

//密码强度验证
$.validator.addMethod('_password', function (value, element, param) {
    var pt = 2;
    var pnum = 0;
    var Flag = false;
    /* 密码中可以包含数字、小写字母、大写字母、特殊字符
     * pt=1 :4种符号中可以包含1种或以上
     * pt=2 :4种符号中可以包含2种或以上
     * pt=3 :4种符号中可以包含3种或以上
     * pt=4 :4种符号中可以包含4种或以上
     */
    //判断密码中是否包含中文
    //var reg0 = /.*[\u4e00-\u9fa5]+.*$/;
    //if (reg0.test(value)) {
    //    return false;
    //}
    //判断密码中是否包含数字
    var reg1 = /\d+/;
    if (reg1.test(value)) {
        pnum++;
    }
    //判断密码中是否包含小写字母
    var reg2 = /[a-z]+/;
    if (reg2.test(value)) {
        pnum++;
    }
    //判断密码中是否包含大写字母
    var reg3 = /[A-Z]+/;
    if (reg3.test(value)) {
        pnum++;
    }
    //判断密码中是否包含特殊字符
    var reg4 = /[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)(\`)]+/;
    if (reg4.test(value)) {
        pnum++;
    }

    if (pnum >= pt) {
        Flag = true;
    }
    return this.optional(element) || Flag;
}, '密码复杂度不足');

//远程验证验证（用户名是否存在）
$.validator.addMethod('_username', function (value, element, param) {
    var pass = true;
    if (!this.optional(element) && value) {

        //$.get('', {}, function (data) { return data.Flag; }, 'JSON');

        return true;

    } else {
        return true;
    }
}, '该用户已存在');

//不能包含中文 或 空格
$.validator.addMethod('_chinablank', function (value, element, param) {
    var flag = true;
    var r1 = /[\u4e00-\u9fa5]+/;
    if (r1.test(value)) {
        flag = false;
    }
    if (value.indexOf(' ') > 0) {
        flag = false;
    }

    return this.optional(element) || flag;

}, '密码中不能包含中文或空格');

//电子邮件地址验证
$.validator.addMethod('_mail', function (value, element, param) {
    var flag = false;
    var r1 = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w{2,}([-.]\w{2,})*$/;
    if (r1.test(value)) {
        flag = true;
    }

    return this.optional(element) || flag;

}, '邮件地址格式不正确');

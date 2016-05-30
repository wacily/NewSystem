jQuery.extend({
    messages: function (options) {
        var defaults = {
            msg: '',
            Type: 'success', //success,error
            Time:5000
        };

        $.extend(defaults, {}, options);
        
        var box_class = "mage_message"

        if (defaults.Type == 'success') {
            box_class = box_class + " mage_success";
        } else {
            box_class = box_class + " mage_error";
        }

        var box_html = "<div class='" + box_class + "'>" + defaults.msg + "</div>";

        $("body").append(box_html);
        $(".mage_message").slideDown(500);

        setTimeout(function () { $(".mage_message").slideUp(500) }, defaults.Time);
        setTimeout(function () { $(".mage_message").remove() }, defaults.Time+500);
    },

    confirm: function (options) {
        var defaults = {
            title: '系统提示',
            msg: '',
            callBack: function () { }
        };

        var cliclEvent={
            cancel:function(){$('.mage_modal').remove();},
            submit:defaults.callBack
        }

        $.extend(defaults, {}, options);

        var box_html = "<div class='mage_modal'>"+
                            "<div class='mage_msg_box'>"+
                                "<div class='mage_box_title'>" + defaults.title + "</div>" +
                                "<div class='mage_box_content'>" + defaults.msg + "</div>"+
                                "<div class='mage_box_options'>"+
                                    "<a class='mage_box_option_submit' href=\"javascript:$('.mage_modal').remove();\">确定</a>" +
                                    "<a class='mage_box_option_cancel' href=\"javascript:$('.mage_modal').remove();\">取消</a>" +
                               " </div>"+
                            "</div>"+
                        "</div>";
        $("body").append(box_html);

        $(document).off("click", ".mage_box_options a.mage_box_option_submit").on("click", ".mage_box_options a.mage_box_option_submit", defaults.callBack);
        //$(document).off("click", ".mage_box_options a.mage_box_option_cancel").on("click", ".mage_box_options a.mage_box_option_cancel", function () { $('.mage_modal').remove(); });
    }
});
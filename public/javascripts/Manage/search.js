$(function(){
  //IP地址归属地查询:
  $("#btnIp").click(function(){
    var ip = $("#txtIp").val();

    var option = {
      type:"ip",
      msg:"IP地址不能为空",
      para:ip,
      result:".tdIp",
      btn:"#btnIp"
    };

    ajaxPost(option);

  });

  //身份证号码归属地查询：
  $("#btnCardNo").click(function(){
    var card = $("#txtCardNo").val();

    var option = {
      type:"card",
      msg:"身份证号码不能为空",
      para:card,
      result:".tdCardNo",
      btn:"#btnCardNo"
    };

    ajaxPost(option);
  });

  //手机号码归属地查询：
  $("#btnPhone").click(function(){
    var phone = $("#txtPhone").val();

    var option = {
      type:"phone",
      msg:"手机号码不能为空",
      para:phone,
      result:".tdPhone",
      btn:"#btnPhone"
    };

    ajaxPost(option);
  });

  //标准北京时间：
  $("#btnTime").click(function(){
    var option = {
      type:"time",
      result:".tdTime",
      btn:"#btnTime"
    };

    ajaxPost(option);
  });

  //汉字拼音互转：
  $("#btnText").click(function(){
    var text = $("#txtText").val();
    var tid =  "1";
    if($("#rbtnText").prop("checked")){
      tid = $("#rbtnText").val();
    }

    var option = {
      type:"text",
      typeid:tid,
      msg:"手机号码不能为空",
      para:text,
      result:".tdText",
      btn:"#btnText"
    };

    ajaxPost(option);
  });

  function ajaxPost(options){
    if(options.type != 'time' && !options.para){
      $.messages({msg:options.msg,Type:'error'});
      return;
    }

    var pdata = {};
    pdata.type = options.type;
    if(options.type != 'time'){
      pdata.para = options.para;
    }
    if(options.type == 'text'){
      pdata.typeid = options.typeid;
    }

    var txt = $(options.btn).val();

    $.ajax({
      url:'/api/search',
      data:pdata,
      type:'POST',
      dataType:'JSON',
      success:function(data){
        if(!data){
          $.messages({ msg: 'Sorry! Server not respone data.', Type: 'error'});
          return;
        }

        var html = "";

        if(data.status == "0"){
          html = "<span class='txt-error'>"+data.msg+"</span>";
        }else{
          html = data.msg;
        }

        $(options.result).html(html);
      },
      error:function(){
        $.messages({ msg: 'Sorry! Server Error.', Type: 'error'});
      },
      beforeSend:function(){
        $(options.btn).val("执行中...").attr("disabled","disabled");
      },
      complete:function(){
        $(options.btn).val(txt).removeAttr("disabled");
      }
    });
  }
});
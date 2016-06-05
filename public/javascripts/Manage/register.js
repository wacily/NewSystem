$(function(){
  $("#myForm").validate({
    rules:{
      userName:'required',
      userPwd:'required',
      nickName:'required',
      age:{
        required:true,
        range:[18,60]
      },
      phone:{
        required:true,
        _phone_cn:true
      },
      email:{
        required:true,
        _mail:true
      }
    },
    messages:{
      userName:'Not null',
      userPwd:'Not null',
      nickName:'Not null',
      age:{
        required:'Not null',
        range:'Between 18 and 60'
      },
      phone:{
        required:'Not null',
        _phone_cn:'Format error'
      },
      email:{
        required:'Not null',
        _mail:'Format error'
      }
    }
  });

  $(".btnRegister").click(function(){
    if($("#myForm").valid()){
      var serData = $("#myForm").serialize();
      $.ajax({
        url:"/api/users/register/",
        data:serData,
        type:"POST",
        dataType:"JSON",
        success:function(data){
          if(!data){
            $.messages({msg:'Server not respone data',Type:'error'});
            return;
          }
          if(data.status == 1){
            $.messages({msg:"Register success!"});
          }else{
            $.messages({msg:data.msg,Type:"error"});
          }
        },
        error:function(){
          $.messages({msg:"Sorry, Server error!",Type:"error"});
        }
      });
    }
  });
});
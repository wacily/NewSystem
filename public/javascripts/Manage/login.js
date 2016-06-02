$(function(){
	$(".login-page").height($(window).height()-120);
	$(".btnLogin").click(function(){
		var userName = $("#txtUserName").val();
		var userPwd = $("#txtUserPwd").val();
		
		var v_r = vild(userName,userPwd);

		if(!v_r.status){
			$.messages({ msg: v_r.msg, Type: 'error'});
		}else{
			var Data = {
				name:userName,
				pwd:userPwd
			};

			$.ajax({
				url:"/api/users/login",
				data:Data,
				type:"POST",
				dataType:"JSON",
				success:function(data){
					if(!data){
						$.messages({ msg: 'Server not response data!', Type: 'error'});
						return;
					}
					if(data.status == 1){
						window.location.href="/manage/index"
					}else{
						$.messages({ msg: data.msg, Type: 'error'});
					}
				},
				error:function(){
					$.messages({ msg: 'Sorry! Server Error.', Type: 'error'});
				}
			});
			
		}
	});	

	$(".btnCancel").click(function(){
		$("#txtUserName,#txtUserPwd").val("");
	});	

	function vild(userName,userPwd){
		var Res = {
			status:true,
			msg:""
		}

		var msg = "";
		var Flag = true;
		if(!userName){
			msg = "UserName don't null";
			Flag = false;
		}

		if(!userPwd){
			if(msg.length>1){
				msg+=", ";
			}
			msg+="User Password don't null";
			Flag = false;
		}

		Res.status = Flag;
		Res.msg = msg;

		return Res;
	}
});
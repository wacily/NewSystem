$(function(){
	$(".login-page").height($(window).height()-120);
	$(".btnLogin").click(function(){
		var userName = $("#txtUserName").val();
		var userPwd = $("#txtUserPwd").val();

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

		if(!Flag){
			$.messages({ msg: msg, Type: 'error'});
		}else{
			//login success
			window.location.href="/manage/index"
		}
	});	

	$(".btnCancel").click(function(){
		$("#txtUserName,#txtUserPwd").val("");
	});	
});
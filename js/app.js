var app=angular.module('main_app',['ui.router','angular-loading-bar','typer']);

//file preview 
app.service("uploadService", function($http, $q,$rootScope) {

    return ({
      upload: upload
    });

    function upload(file) {
      var upl = $http({
        method: 'POST',
        url: 'http://api.bloodport.in/dashboard/submit_patient_detail', // /api/upload
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          upload: file
        },
        transformRequest: function(data, headersGetter) {
          var formData = new FormData();
          angular.forEach(data, function(value, key) {
            formData.append(key, value);
          });

          var headers = headersGetter();
          delete headers['Content-Type'];

          return formData;
        }
      });
      return upl.then(handleSuccess, handleError);

    } // End upload function

    // ---
    // PRIVATE METHODS.
    // ---
  	
    function handleError(response, data) {
      if (!angular.isObject(response.data) ||!response.data.message) {
        return ($q.reject("An unknown error occurred."));
      }

      return ($q.reject(response.data.message));
    }

    function handleSuccess(response) {
      return (response);
    }

  })



 app.directive("fileinput", [function() {
    return {
      scope: {
        fileinput: "=",
        filepreview: "="
      },
      link: function(scope, element, attributes) {
        element.bind("change", function(changeEvent) {
          scope.fileinput = changeEvent.target.files[0];
          var reader = new FileReader();
          reader.onload = function(loadEvent) {
            scope.$apply(function() {
              scope.filepreview = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(scope.fileinput);
        });
      }
    }
  }]);

//fb login
window.fbAsyncInit = function() {
    FB.init({
      appId            : '463464124027028',
      autoLogAppEvents : true,
      xfbml            : true,
      status     	   : true, // check login status
      cookie     	   : true, // enable cookies to allow the server to access the session
      version          : 'v2.10'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

//loading bar
app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }])


app.config(function($stateProvider,$urlRouterProvider,$locationProvider){

	$urlRouterProvider.otherwise('/mainpage');
	$locationProvider.html5Mode(true);
	$stateProvider
		.state('mainpage',{
			url: '/mainpage',
			templateUrl: 'mainPage.html',
			controller:'mainpageController'
		})
		.state('signup',{
			url:'/signup',
			templateUrl:'sign_up.html',
			controller:'signupController'
		})
		.state('forgotpassword',{
			url:'/forgotpassword',
			templateUrl:'forgotPassword.html',
			controller:'fpassController'
		})

		.state('dashboard',{
			url:'/dashboard',
			templateUrl:'dashboard.html',
			controller:'dashboardController'
		})
		.state('dashboard.bloodsure',{
			url: '/bloodsure',
			templateUrl: 'bloodsure.html',
			controller: 'bloodsure_controller'
		})

		.state('dashboard.userprofile',{
			url: '/userprofile',
			templateUrl: 'userprofile.html',
			controller: 'userprofileController'
		})

		.state('dashboard.history',{
			url: '/history',
			templateUrl: 'history.html',
			controller: 'historyController'
		})

		.state('dashboard.hospital',{
			url: '/findHospitals',
			templateUrl: 'hospital.html',
			controller: 'hospitalController'
		})
		.state('dashboard.donor',{
			url:'/search',
			templateUrl:'donor.html',
			controller:'donorController'
		})
		.state('dashboard.findDonor',{
		url:'/findDonor',
			templateUrl:'findDonor.html',
			controller:'findDonorController'

		})
		.state('dashboard.beDonor',{
			url:'/findcamps',
			templateUrl:'beDonor.html',
			controller:'beDonorController'
		})

		.state('footerpages',{
			url:'/footerpages',
			templateUrl: 'footer.html',
			controller: 'footerController'
		})
		.state('footerpages.privacy',{
			url: '/footerpages.privacy',
			templateUrl: 'privacy.html',
			controller: 'privacyController'
		})
		.state('footerpages.tandc',{
			url: '/footerpages.tandc',
			templateUrl: 'tandc.html',
			controller: 'tandcController'
		})
		.state('footerpages.legal',{
			url: '/footerpages.legal',
			templateUrl: 'legal.html',
			controller: 'legalController'
		})
		.state('footerpages.faq',{
			url: '/footerpages.faq',
			templateUrl: 'faq.html',
			controller: 'faqController'
		})
});

/*app.factory('share_details',function($rootScope){
	var scope={};

	return{
		store: function(key,value){
			scope[key]=value;
		},
		get: function(key){
			return scope[key];
		}
	}
});*/

app.controller('mainpageController',function($state,$scope,$rootScope,$http){
	$scope.findDonor=function(){
		if($rootScope.loggedIn==true)
		{
			$state.go('dashboard.findDonor');
		}
		else
		{
			$state.go('signup');
		}
	}
	$scope.findHospitals=function(){
		if($rootScope.loggedIn==true)
		{
			$state.go('dashboard.hospital');
		}
		else
		{
			$state.go('signup')
		}
	}

	$scope.donateBlood=function(){
		if($rootScope.loggedIn==true)
		{
			$state.go('dashboard.beDonor');
		}
		else
		{
			$state.go('signup')
		}
	}

	$scope.bloodsure=function(){
		if($rootScope.loggedIn==true)
		{
			$state.go('dashboard.bloodsure');
		}
		else
		{
			$state.go('signup')
		}
	}

	$scope.emergencyUser=function(){
		$rootScope.emergency_user=true;
		console.log("emergency_user caled");
		$('#modal1').show();
		$('#modal1').css({
          	zIndex:4
        });
        $('.cancel_btn').click(function(){
      $('#modal1').hide();
    });
	}

	$scope.check=function(){
		if(($scope.modal_user_blood_grp==null)||($scope.modal_user_email==null))
		{
			return true;
		}
		else
		{
			return false;
		}
	}

		$scope.check_user=function(){
		$rootScope.mainOTP=false;
		$scope.modalOTPsent=false;
		console.log("check user from modal called");
		$http({
			method: "POST",
			url: 'http://api.bloodport.in/register/modal_check',
			data:{
				user_mobile_no: $scope.modal_user_mobile_no,
			}
		}).then(function(response){
			$rootScope.logged_mobile_no=$scope.modal_user_mobile_no;
			console.log(response.data);

			if(response.data=="User exists")
			{
				Materialize.toast('User exists!!!. Please book via login your account',3000,'red darken-3');
				$scope.modal_user_mobile_no=null;
				$scope.modal_user_blood_grp=null;
				$scope.modal_user_email=null;
				$('#modal1').hide();
			}
			else if(response.data=="new user")
			{
				/*$state.go('dashboard.bloodsure');*/
				$rootScope.mainOTP=true;
				$('#modal1').css({
					height: 250
				})

				//code for sending otp to emergency user
				/*
				$http({
						method:'POST',
						url:'https://sendotp.msg91.com/api/generateOTP',
						headers: {
				             "application-Key": "_2NXWaVUffdYqANPke1RP6hq4fTAe-Buk1cT9ukSBJ0OO9aDlUlSeR4i7W5o1zjZo0GMhA6np5JNaka4jVYip5oUx_xAqQbhmpbgOt2nxrGVPvE6IPiemhKl6q44dmTrLsOcAiUL1OyGw8TqXpNkjg=="
				        },
						data:{
							countryCode:91,
							mobileNumber:$scope.modal_user_mobile_no,
							getGeneratedOTP:true	 
						}
				}).then((response)=>{
							console.log("OTP has been send");
							$scope.modalOTPsent=true;
							$rootScope.modalOTP=response.data.response.oneTimePassword;
							console.log("OTP is"+$rootScope.modalOTP);
				});*/
				$rootScope.modalOTP=7777;	
			}
		})
	}

	$scope.verifyEmergencyOTP=function(){
		if($scope.inputOTP && $rootScope.modalOTP)
		{
			if($scope.inputOTP==$rootScope.modalOTP)
			{
				$scope.emergency_user_pass=Math.random().toString(36).slice(-8);
				console.log($scope.emergency_user_pass);
				$http({
					method: 'POST',
					url:'http://api.bloodport.in/register/emergency_submit',
					data:{
						user_mobile_no: $scope.modal_user_mobile_no,
						user_email: $scope.modal_user_email,
						user_blood_grp: $scope.modal_user_blood_grp,
						user_pass: $scope.emergency_user_pass
					}
				}).then(function(response){
					console.log("user saved");
					Materialize.toast('User added',3000,'red darken-3');
					$state.go('dashboard.bloodsure');
				});
			}
			else{
				Materialize.toast('OTP doesn\'t match');
				$('#modal1').hide();
				$scope.modal_user_email=null;
				$scope.modal_user_mobile_no=null;
				$scope.modal_user_blood_grp=null;
				$scope.inputOTP=null;
			}
		}
		else
		{
			Materialize.toast('Some error has occured!!!',3000,'red darken-3');
		}
	}
})

app.controller('signupController',function($scope,$http,$rootScope,$state,cfpLoadingBar)
{
	console.log("signupController called");


	$scope.FbLogin=function()
	{
		$rootScope.fbLoginResponse=null;
		var perm=[
		'email',
		'user_birthday'
		].join(',');
		var fields=[
		'name',
		'email',
		'gender'
		].join(',');
		FB.login(function(response) {
		    if (response.authResponse) 
		    {
			     FB.api('/me',{fields:fields}, function(response) {
			       console.log('Good to see you, ' + response + '.');
			       console.log(response);
			       $rootScope.fbLoginResponse=response;
			       console.log("response is "+$rootScope.fbLoginResponse.name);
			     });
			     $('#modal2').show();
			     $('#modal2').css({
			     	zIndex:4
			     })
			      $('.fb_cancel_btn').click(function(){
   				  $('#modal2').hide();
    			 });
			     //$state.go('dashboard.bloodsure');
		    } 
		    else 
		    {
		     console.log('User cancelled login or did not fully authorize.');

		    }
		},{
			scope: perm,
			return_scopes: true,
			auth_type: 'reauthenticate'
		  });
	}
	$scope.faceBookLogin=function()
	{
		$http({
			method:'POST',
			url:'http://api.bloodport.in/register/modal_check',
			data:{
				user_mobile_no:$scope.socialLoginPhone
			}
		}).then((res)=>{
			console.log($scope.socialLoginPhone);
			console.log(res.data);
			if(res.data=="User exists")
			{
				$rootScope.userNotExists=false;
				Materialize.toast("User already exists,Please signup with a different identity", 3000,'red darken-3');
				$scope.socialLoginPhone=null;
			}
			else
			{
				$rootScope.userNotExists=true;
				$rootScope.fb_bloodgrp=$scope.fb_blood_grp;
				$rootScope.fbPhone=$scope.socialLoginPhone;
				console.log($rootScope.fb_bloodgrp);
				console.log($rootScope.fbPhone);
				$http({
						method:'POST',
						url:'https://sendotp.msg91.com/api/generateOTP',
						headers: {
				             "application-Key": "_2NXWaVUffdYqANPke1RP6hq4fTAe-Buk1cT9ukSBJ0OO9aDlUlSeR4i7W5o1zjZo0GMhA6np5JNaka4jVYip5oUx_xAqQbhmpbgOt2nxrGVPvE6IPiemhKl6q44dmTrLsOcAiUL1OyGw8TqXpNkjg=="
				        },
						data:{
							countryCode:91,
							mobileNumber:$rootScope.fbPhone,
							getGeneratedOTP:true	 
						}
					}).then((response)=>{
							//console.log("OTP has been send");
							$rootScope.FbOTPsent=true;
							$rootScope.fbOTP=response.data.response.oneTimePassword;
							console.log("OTP is"+$rootScope.fbOTP);
					});
			}
		})

	}

	$scope.FbOTPVerify=function()
	{
		if($scope.socialLoginOTP&&$rootScope.FbOTPsent)
		{
			if($scope.socialLoginOTP==$rootScope.fbOTP)
			{
				$http({
					method:'POST',
					url:'http://api.bloodport.in/register/signup',
					data:{
						user_mobile_no:$rootScope.fbPhone,
						user_blood_grp:$rootScope.fb_bloodgrp,
						user_name:$rootScope.fbLoginResponse.name,
						user_gender:$rootScope.fbLoginResponse.gender,
					}
				}).then((res)=>{
					$rootScope.logged_mobile_no=$rootScope.fbPhone
					console.log("user has been signup by fb");
					var randomstring = Math.random().toString(36).slice(-8);
					console.log(randomstring);
					$state.go('dashboard.bloodsure');
				});
			}
			else
			{
				$scope.FbErrorMsg="OTP doesn't match";
				console.log("not macthed");
			}

		}
		else
		{
			$scope.FbErrorMsg="Please Enter OTP";
		}
		
	}
//added from here
	$scope.onGoogleLogin=function(){
		var params={
			'clientid': '277264571124-pgi5trtp99gtq2of2o70i2l1jcfc9mss.apps.googleusercontent.com',
			'cookiepolicy': 'single_host_origin',
			'callback': function(result){
				if(result['status']['signed_in']){
					var request=gapi.client.plus.people.get({
						'userId': 'me'
					});
					request.execute(function(resp){
						$scope.$apply(function(){
							$scope.google_username=resp.displayName;
							$scope.google_user_email=resp.emails[0].value;
							$scope.google_user_gender=resp.gender;
							$scope.googleSignInCheck=true;
							console.log($scope.google_username);
							console.log($scope.google_user_email);
							console.log($scope.google_user_gender);
							$('#modal3').show();
							$('#modal3').css('zIndex',4);
						});
					});
				}
			},
			'approvalprompt':'force',
			'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
		}

		gapi.auth.signIn(params);
	}

	$scope.cancel=function(){
		console.log("google user didn't authorize");
		$('#modal3').hide();
	}

	$scope.continue=function(){
		if(($scope.google_phone_no==null)||($scope.google_blood_grp==null))
		{
			console.log("details not filled");
			$scope.detailsEmptyTrue=true;
			$scope.detailsEmpty="Please fill in your details";
		}
		else
		{
			$http({
				method: 'POST',
				url: 'http://api.bloodport.in/register/modal_check',
				data: {
					user_mobile_no: $scope.google_phone_no
				}
			}).then(function(response){
				console.log(response);
				if(response.data=="User exists")
				{
					$rootScope.google_user_not_exists=false;
					Materialize.toast('User already exists!!!!!',7000,'red darken-3');
					$('#modal3').hide();
				}
				else
				{
					$rootScope.google_user_not_exists=true;
					//code for sending otp
					$scope.googleOTP=7777;
					/*
					$http({
						method: 'POST',
						url: 'https://sendotp.msg91.com/api/generateOTP',
						headers: {
					         "application-Key": "_2NXWaVUffdYqANPke1RP6hq4fTAe-Buk1cT9ukSBJ0OO9aDlUlSeR4i7W5o1zjZo0GMhA6np5JNaka4jVYip5oUx_xAqQbhmpbgOt2nxrGVPvE6IPiemhKl6q44dmTrLsOcAiUL1OyGw8TqXpNkjg=="
					    },
						data:{
							countryCode:91,
							mobileNumber:$scope.google_phone_no,
							getGeneratedOTP:true	 
						}
					}).then(function(response){
						$scope.googleOTPSent=true;
						$scope.googleOTP=response.data.response.oneTimePassword,
						console.log($scope.googleOTP);
					});*/		
				}
			})
		}
	}
		
	$scope.saveGoogleUserDetails= function(){
		if($scope.google_user_otp)
		{
			if($scope.google_user_otp==$scope.googleOTP)
			{
				$scope.google_user_pass=Math.random().toString(36).slice(-8);
				console.log($scope.google_user_pass);
				console.log("saving details in db");
				$http({
					method:'POST',
					url: 'http://api.bloodport.in/register/specialSignUp',
					data:{
						user_mobile_no:$scope.google_phone_no,
						user_blood_grp:$scope.google_blood_grp,
						user_name: $scope.google_username,
						user_email: $scope.google_user_email,
						user_pass: $scope.google_user_pass,
						user_gender: $scope.google_user_gender
					}
				}).then(function(response){
					console.log("google user added");
					$rootScope.logged_mobile_no=$scope.google_phone_no;
					$state.go('dashboard.bloodsure');
					console.log($scope.logged_mobile_no);
				})
			}	
			else
			{
				Materialize.toast("OTP don't match, Please enter again",7000,'red darken-3');
			}
		}
		else
		{
			Materialize.toast("Please enter OTP",7000,'red darken3');
		}
	}

	$scope.check_fields=function()
	{
		var check_select=true;
		if(($scope.user_dob==null)||($scope.user_blood_grp==null)||($scope.user_gender==null))
		{
			check_select=true;
			return check_select;
		}
		else
		{
			check_select=false;
			return check_select;
		}
	}

	$scope.cmprPass=function()
	{

		var check=false;
		if(($scope.user_password==null && $scope.user_confirm_password==null) || ($scope.user_password!=$scope.user_confirm_password))
		{
			check=true;
			return check;
		}
		else
		{
			check=false;
			return check;
		}
	}
	$scope.callsignUp=function()
	{
		console.log("signup called");
		$scope.OTPsent=false;
		$http({
			method:'POST',
			url:'http://api.bloodport.in/register/check',
			data:{
				user_mobile_no:$scope.user_mobile_no
			}
		}).then((res)=>{
			console.log("res is "+res.data);
			if(res.data=="true")
			{
				Materialize.toast("User already exists,Please signup with a different identity", 3000,'red darken-3');
				$scope.user_email=null;
				$scope.user_name=null;
				$scope.user_mobile_no=null;
				$scope.user_password=null;
				$scope.user_confirm_password=null;
				$scope.user_blood_grp.selected=null;
				$scope.OTPsent=false;
			}
			else 
			{	//'https://sendotp.msg91.com/api/generateOTP
				console.log("Inside else of signupController");
				$('#modal1').show();
				$('#modal1').css({
          			zIndex:4
        		});
				console.log("dob "+$scope.user_dob);
				$http({
						method:'POST',
						url:'https://sendotp.msg91.com/api/generateOTP',
						headers: {
				             "application-Key": "_2NXWaVUffdYqANPke1RP6hq4fTAe-Buk1cT9ukSBJ0OO9aDlUlSeR4i7W5o1zjZo0GMhA6np5JNaka4jVYip5oUx_xAqQbhmpbgOt2nxrGVPvE6IPiemhKl6q44dmTrLsOcAiUL1OyGw8TqXpNkjg=="
				        },
						data:{
							countryCode:91,
							mobileNumber:$scope.user_mobile_no,
							getGeneratedOTP:true	 
						}
					}).then((response)=>{
							//console.log("OTP has been send");
							$scope.OTPsent=true;
							$rootScope.OTP=response.data.response.oneTimePassword;
							//console.log("OTP is"+$rootScope.OTP);
						});
			}
		}).finally(function(){
			console.log("loading bar");
			cfpLoadingBar.complete();
		});

	},

		$scope.verifyOTP=function()
		{
			if($scope.user_OTP && $scope.OTPsent)
			{
				if($scope.user_OTP==$rootScope.OTP)
				{
					console.log("OTP verified");
					$scope.user_OTP=null;
						$http({
							method: 'POST',
							url: 'http://api.bloodport.in/register/signup',
							data:{
							user_name: $scope.user_name,
							user_email: $scope.user_email,
							user_mobile_no: $scope.user_mobile_no,
							user_blood_grp: $scope.user_blood_grp,
							user_dob: $scope.user_dob,
							user_gender: $scope.user_gender,
							user_password:$scope.user_password,
							user_confirm_password:$scope.user_confirm_password
							}
						}).then(function(response){
							Materialize.toast(response.data, 3000,'red darken-3');
							/*Edit by sakshi*/
							$scope.user_email=null;
							$scope.user_name=null;
							$scope.user_mobile_no=null;
							$scope.user_password=null;
							$scope.user_confirm_password=null;
							$scope.user_blood_grp.selected=null;
							$scope.OTPsent=false;
							/*-----------------*/
						})
					
				}
				else
				{
					Materialize.toast("OTP doesn't match", 3000,'red darken-3');
				}
			}
			else
			{
				$scope.errorMsg="Please Enter the OTP sent to your Phone No."
			}
		}


		$scope.login =function()
		{
		$rootScope.loggedIn=false;
		$http({
			method: 'POST',
			url: 'http://api.bloodport.in/register/login_user',
			data:{
				user_mobile_no: $scope.user_login_mobile_no,
				user_password: $scope.user_login_password
				}
		}).then(function(res){
			if(res.data=="true")
			{
				$rootScope.loggedIn=true;
				/* addded by sakshi on 20/7/17 */
				$rootScope.logged_mobile_no=$scope.user_login_mobile_no;
				console.log($rootScope.logged_mobile_no);
				/*add ended */
				$state.go('dashboard.bloodsure');
			}
			else
			{
				Materialize.toast(res.data, 3000,'red darken-3');
			}
			
		}).finally(function(){
			cfpLoadingBar.complete();
		});
	}
})



app.controller('fpassController',function($scope,$http,$state,cfpLoadingBar){
	console.log("fpassController  called");
	$scope.submitbtn=function(){
		if($scope.user_email)
		{
			$http({
			method: 'POST',
			url: 'http://api.bloodport.in/register/forgotpassword',
			data: {
				user_email: $scope.user_email
				}
			}).then(function(res){
				console.log("user found here.");
				$scope.response= res.data;
				$state.go('signup');
			}).finally(function(){
				cfpLoadingBar.complete();
			});
		}
		else
		{
			$scope.response="Please Enter an e-mail I'd";
		}

	}
});

/*app.controller('updatePasswordController',function($scope,$http,$state){
	console.log("update password controller called");
	$scope.updatebtn=function(){
		
		$http({
			method: 'POST',
			url: 'http://api.bloodport.in/register/updatePassword',
			data: {
				user_password: $scope.user_password,
				user_confirm_password: $scope.user_confirm_password
			}
		}).then(function(res){
			console.log("password reset!!!");
			$scope.response=res.data;
			if(res.data=="Passwords don't match"){
				$scope.response=res.data;
			}
			else{
				//setInterval(2000);
				$state.go('reset');
			}
		});
	}
});*/
app.controller('dashboardController',function($scope,$rootScope,$state){
	console.log('Dahsboard console called');
	$scope.logout=function(){
		$rootScope.loggedIn=false;
		$state.go('mainpage');
	}
})

app.controller('bloodsure_controller',function($scope,$http,$rootScope,uploadService){
	$scope.data={};
	$rootScope.dahsboardtitle="BloodSURE (Book/Pay/Recieve)";

	console.log("bloodsure_controller called");

	$scope.check_fields=function(){
		var check_field1=true;
		if(($scope.data.blood_grp==null)||($scope.data.hospital==null)||($scope.data.unit_of_blood==null)||($scope.data.city==null)){
			return true;
		}
		else
		{
			return false;
		}
	}

	$scope.cost_calculation=function(){
			var unit=$scope.data.unit_of_blood;
			var bloodgrp=$scope.data.blood_grp;

			if(bloodgrp=="Whole HUman Blood IP")
			{
				if(unit==2)
				{
					$scope.data.cost=5000;
					return 5000;
				}
				else if(unit==3)
				{
					$scope.data.cost=7500;
					return 7500;
				}
				else if(unit==4)
				{
					$scope.data.cost=10000;
					return 10000;
				}
				else if(unit==5)
				{
					$scope.data.cost=12500;
					return 12500;
				}
			}
			else if (bloodgrp=="Concentrated Human Red Blood Corpuscles IP (Packed Red Cells)")
			{
				if(unit==2)
				{
					$scope.data.cost=5000;
					return 5000;
				}
				else if(unit==3)
				{
					$scope.data.cost=7500;
					return 7500;
				}
				else if(unit==4)
				{
					$scope.data.cost=10000;
					return 10000;
				}
				else if(unit==5)
				{
					$scope.data.cost=12500;
					return 12500;
				}
			}
			else if(bloodgrp=="Platelet Concentrate BP")
			{
				if(unit==2)
				{
					$scope.data.cost=2200;
					return 2200;
				}
				else if(unit==3)
				{
					$scope.data.cost=3300;
					return 3300;
				}
				else if(unit==4)
				{
					$scope.data.cost=4400;
					return 4400;
				}
				else if(unit==5)
				{
					$scope.data.cost=5500;
					return 5500;
				}
			}
			else if (bloodgrp=="Fresh Frozen Plasma")
			{
				if(unit==2)
				{
					$scope.data.cost=2500;
					return 2500;
				}
				else if(unit==3)
				{
					$scope.data.cost=3750;
					return 3750;
				}
				else if(unit==4)
				{
					$scope.data.cost=5000;
					return 5000;
				}
				else if(unit==5)
				{
					$scope.data.cost=6250;
					return 6250;
				}
			}
			else if(bloodgrp=="Plateletphersis")
			{
				if(unit==2)
				{
					$scope.data.cost=22100;
					return 22100;
				}
				else if(unit==3)
				{
					$scope.data.cost=33150;
					return 33150;
				}
				else if(unit==4)
				{
					$scope.data.cost=44200;
					return 44200;
				}
				else if(unit==5)
				{
					$scope.data.cost=55250;
					return 55250;
				}
			}
			else if(bloodgrp=="Leucoreduced (Packed Red Cells)")
			{
				if(unit==2)
				{
					$scope.data.cost=5300;
					return 5300;
				}
				else if(unit==3)
				{
					$scope.data.cost=7950;
					return 7950;
				}
				else if(unit==4)
				{
					$scope.data.cost=10600;
					return 10600;
				}
				else if(unit==5)
				{
					$scope.data.cost=13250;
					return 13250;
				}	
			}
			else if(bloodgrp=="Cryoprecipitate")
			{
				if(unit==2)
				{
					$scope.data.cost=2400;
					return 2400;
				}
				else if(unit==3)
				{
					$scope.data.cost=3600;
					return 3600;
				}
				else if(unit==4)
				{
					$scope.data.cost=4800;
					return 4800;
				}
				else if(unit==5)
				{
					$scope.data.cost=6000;
					return 6000;
				}	
			}
			else if(bloodgrp=="Blood Group & Rh Typing (by automated system)"){
				if(unit==2)
				{
					$scope.data.cost=200;
					return 200;
				}
				else if(unit==3)
				{
					$scope.data.cost=300;
					return 300;
				}
				else if(unit==4)
				{
					$scope.data.cost=400;
					return 400;
				}
				else if(unit==5)
				{
					$scope.data.cost=500;
					return 500;
				}	
			}
			else if(bloodgrp=="Therapeutic Phlebotomy")
			{
				if(unit==2)
				{
					$scope.data.cost=1000;
					return 1000;
				}
				else if(unit==3)
				{
					$scope.data.cost=1500;
					return 1500;
				}
				else if(unit==4)
				{
					$scope.data.cost=2000;
					return 2000;
				}
				else if(unit==5)
				{
					$scope.data.cost=2500;
					return 2500;
				}
			}
		}

		
	$scope.$watch('file', function(newfile, oldfile) {
      if(angular.equals(newfile, oldfile) ){
        return;
      }
     });
	$scope.mysubmit=function(){
	/* code for payment gateway*/


      console.log($rootScope.file+'jhshsbhjasvhjvcjhcvjdvcv');
      uploadService.upload(newfile).then(function(res){
        // DO SOMETHING WITH THE RESULT!
        console.log("result", res);
      })
   
		$scope.data.calculatedcost=$scope.cost_calculation();
		console.log($scope.data.calculatedcost);
		console.log($rootScope.logged_mobile_no);
		$http({
		method: 'POST',
		url: 'http://api.bloodport.in/dashboard/submit_patient_detail',
		data:{
			patient_name: $scope.data.patient_name,
			blood_grp: $scope.data.blood_grp,
			doctor_name: $scope.data.doctor_name,
			hospital: $scope.data.hospital,
			unit_of_blood: $scope.data.unit_of_blood,
			city: $scope.data.city,
			cost: $scope.data.calculatedcost,
			/* addded by sakshi on 20/7/17 */
			mobile_no: $rootScope.logged_mobile_no
			/* add ended */
		}
	}).then(function(response){
		console.log(response.data);
		if(response.data=="Your request has been successfully saved!!!"){
			Materialize.toast(response.data,3000,'red darken-3');	
			$scope.data.patient_name=null;
			 $scope.data.blood_grp=null;
			 $scope.data.doctor_name=null;
			 hospital: $scope.data.hospital=null;
			 $scope.data.unit_of_blood=null;
			 $scope.data.city=null;
			 $scope.data.cost=null;
		}
		else{
			Materialize.toast("Some error has occured. Please try again!!!",3000,'red darken-3');
		}
	});
	}

	
});

/* addded by sakshi on 20/7/17 */
app.controller('userprofileController',function($scope,$http,$state,$rootScope){
	/* add ended */
	console.log("userprofileController controller");
	$rootScope.dahsboardtitle="User Profile";
	console.log($rootScope.emergency_user);

	$scope.check=function(){
		if(($scope.user_modal_name==null)||($scope.user_modal_dob==null)||($scope.user_modal_gender==null))
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	if($rootScope.emergency_user)
	{
		console.log("it is an emergency_user");
		$('#modal1').show();
		$('#modal1').css({
			zIndex: 16,
		});

	}
	else
	{
		console.log("it is signed up user");
		console.log("getting details");

	$http({
		method: 'POST',
		url: 'http://api.bloodport.in/register/get_details',
		data:{
			/* addded by sakshi on 20/7/17 */
			user_mobile_no: $rootScope.logged_mobile_no
			/* add ended */
		}
	}).then(function(response){
		$scope.show_data=response.data;
	})

	console.log("updating details");

	$scope.update_profile=function(){
		/* addded by sakshi on 20/7/17 */
		$scope.user_mobile_no=$rootScope.logged_mobile_no
		/* add ended */
		$http({
			method: 'POST',
			url: 'http://api.bloodport.in/register/update_details',
			data:{
				user_name: $scope.user_name,
				user_email: $scope.user_email,
				user_blood_grp: $scope.user_blood_grp,
				user_mobile_no: $scope.user_mobile_no,
				user_dob: $scope.user_dob,
				user_gender: $scope.user_gender
			}
		}).then(function(response){
			console.log("user updated");
			console.log(response.data);

			Materialize.toast(response.data,3000,'red darken-3');

			$http({
				method: 'POST',
				url: 'http://api.bloodport.in/register/get_details',
				data:{
					/* addded by sakshi on 20/7/17 */
					user_mobile_no: $rootScope.logged_mobile_no
					/* add ended */
				}
			}).then(function(response){
				$scope.show_data=response.data;
			})
		})
	}
	}

	$scope.update_modal_details=function(){
		console.log('update_modal_details caled');
		$http({
			method: 'POST',
			url:'http://api.bloodport.in/register/update_modal_details',
			data:{
			user_name: $scope.user_modal_name,
			user_dob: $scope.user_modal_dob,
			user_gender: $scope.user_modal_gender,
			user_mobile_no: $rootScope.logged_mobile_no
			}
		}).then(function(response){
			console.log("details added");
			$rootScope.emergency_user=false;
			Materialize.toast('details added',3000,'red-darken-3');
			$state.go('dashboard.bloodsure');	
		})
	}
})

app.controller('donorController',function($rootScope,$scope,$state,$http){
	console.log("donorController called");
	$rootScope.dahsboardtitle="Find Donor/Be a Donor"
	if($rootScope.emergency_user)
	{
		console.log("it is an emergency_user");
		$('#modal1').show();
		$('#modal1').css({
			zIndex: 16,	
		});
	}

	$scope.check=function(){
		if(($scope.user_modal_name==null)||($scope.user_modal_dob==null)||($scope.user_modal_gender==null))
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	$scope.update_modal_details=function(){
		console.log('update_modal_details caled');
		$http({
			method: 'POST',
			url:'http://api.bloodport.in/register/update_modal_details',
			data:{
			user_name: $scope.user_modal_name,
			user_dob: $scope.user_modal_dob,
			user_gender: $scope.user_modal_gender,
			user_password: $scope.user_modal_pass,
			user_mobile_no: $rootScope.logged_mobile_no
			}
		}).then(function(response){
			console.log("details added");
			$rootScope.emergency_user=false;
			Materialize.toast('details added',3000,'red-darken3');
			$state.go('dashboard.bloodsure');	
		})
	}	
})

app.controller('findDonorController',function($scope,$rootScope,$state,$http){
	console.log("find donor controller called");
	$rootScope.dahsboardtitle="Find Donor";
	$rootScope.donor_status="Available";
	$scope.styles={'background-color' : '#c62828','color':'white'};
	$scope.style4=$scope.styles;
	console.log($scope.style4);
	$http({
		method:'GET',
		url:'http://api.bloodport.in/donor/allDonors',

	}).then((res)=>{
		$scope.details=res.data;
	})
	$scope.findAll=function(){
		$http({
		method:'GET',
		url:'http://api.bloodport.in/donor/allDonors',

		}).then((res)=>{
			$scope.details=res.data;
		})
	}
	$scope.searchByLocation=function(){
		$http({
			method:'POST',
			url:'http://api.bloodport.in/donor/sortByLocation',
			data:{
				donor_location:$scope.donor_location,
				donor_status:$rootScope.donor_status
			}
		}).then((res)=>{
			if(res.data)
			{
				$scope.details=res.data;
				console.log("res is"+res.data);
			}
			if(res.data=="")
			{
				Materialize.toast("There is no Donor at "+$scope.donor_location+"", 3000,'red darken-3');
			}
			
		})
	}

	$scope.searchByBloodgrp=function(){
		$http({
			method:'POST',
			url:'http://api.bloodport.in/donor/sortByBloodgrp',
			data:{
				donor_bloodgrp:$scope.donor_bloodgrp,
				donor_status:$rootScope.donor_status
			}
		}).then((res)=>{
			if(res)
			{
				console.log($scope.donor_bloodgrp);
				$scope.details=res.data
			}
			if(res.data=="")
			{
				Materialize.toast("There is no Donor with Blood group "+$scope.donor_bloodgrp+"", 3000,'red darken-3');
			}
			
		})
	}

	$scope.searchByStatus=function(){
		
		console.log($scope.donor_status);
		$http({
			method:'POST',
			url:'http://api.bloodport.in/donor/sortByStatus',
			data:{
				donor_status:$rootScope.donor_status
			}
		}).then((res)=>{
			if(res)
			{
				$scope.details=res.data
			}
			if(res.data="")
			{
				Materialize.toast("There is no available Donor", 3000,'red darken-3');
			}
		})
	}
})

app.controller('beDonorController',function($scope,$rootScope,$state,$http){
	$rootScope.dahsboardtitle="Be a Donor";
	$scope.styles={'background-color' : '#c62828','color':'white'};
	$scope.style1=$scope.styles;
	$http({
		method:'GET',
		url:'http://api.bloodport.in/camps/allCamps',
	}).then((res)=>{
		console.log(res.data);
		$scope.details=res.data
	})
	$scope.allCamps=function(){
		$http({
		method:'GET',
		url:'http://api.bloodport.in/camps/allCamps',
		}).then((res)=>{
			console.log(res.data);
			$scope.details=res.data
		})
	}
	$scope.searchCampbyLocation=function(){
		$http({
			method:'POST',
			url:'http://api.bloodport.in/camps/campbyLocation',
			data:{
				camplocation:$scope.camplocation
			}
		}).then((res)=>{
			if(res.data)
			{
				$scope.details=res.data
			}
			if(res.data=="")
			{
				Materialize.toast("No camp Available at "+$scope.camplocation+"", 3000,'red darken-3');
			}
			
		})
	}

		$scope.searchByDate=function(){
		$http({
			method:'POST',
			url:'http://api.bloodport.in/camps/campByDate',
			data:{
				dateOfDonation:$scope.dateOfDonation
			}
		}).then((res)=>{
			if(res.data)
			{
				console.log($scope.dateOfDonation);
				$scope.details=res.data
			}
			if(res.data=="")
			{
				Materialize.toast("No camp Available on "+$scope.dateOfDonation+"", 3000,'red darken-3');
			}
			
		})
	}


	$scope.searchCampbyOrganizer=function(){
		console.log("Camp Oragnization");
		console.log($scope.camporganizer);
		$http({
			method:'POST',
			url:'http://api.bloodport.in/camps/campByOrganizer',
			data:{
				campOrganizer:$scope.camporganizer
			}
		}).then((res)=>{
			console.log($scope.camporganizer);
			if(res.data)
			{
				$scope.details=res.data
			}
			if(res.data=="")
			{
				Materialize.toast("No camp Available by "+$scope.camporganizer+"", 3000,'red darken-3');
			}
			
		})
	}

	$scope.searchCampbyBloodBank=function(){
		console.log("Blood Bank search");
		console.log($scope.bloodBank);
		$http({
			method:'POST',
			url:'http://api.bloodport.in/camps/campByBloodBank',
			data:{
				bloodBank:$scope.bloodBank
			}
		}).then((res)=>{
			console.log($scope.bloodBank);
			if(res.data)
			{
				$scope.details=res.data
			}
			if(res.data=="")
			{
				Materialize.toast("No camp Available by "+$scope.bloodBank+"", 3000,'red darken-3');
			}
			
		})
	}
})


app.controller('historyController',function($scope,$http,$rootScope,$state){
	/* add ended */
	console.log("historyController called");
	$rootScope.dahsboardtitle="Your History"

	$scope.check=function(){
		if(($scope.user_modal_name==null)||($scope.user_modal_dob==null)||($scope.user_modal_gender==null))
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	$scope.update_modal_details=function(){
		console.log('update_modal_details caled');
		$http({
			method: 'POST',
			url:'http://api.bloodport.in/register/update_modal_details',
			data:{
			user_name: $scope.user_modal_name,
			user_dob: $scope.user_modal_dob,
			user_gender: $scope.user_modal_gender,
			user_password: $scope.user_modal_pass,
			user_mobile_no: $rootScope.logged_mobile_no
			}
		}).then(function(response){
			console.log("details added");
			$rootScope.emergency_user=false;
			Materialize.toast('details added',3000,'red-darken3');
			$state.go('dashboard.bloodsure');	
		})
	}
	if($rootScope.emergency_user)
	{
		console.log("it is an emergency_user");
		$('#modal1').show();
		$('#modal1').css({
			zIndex: 16,
		});
	}
	else{
		$http({
			method: 'POST',
			url: 'http://api.bloodport.in/dashboard/get_patient_data',
			data: {
				/* addded by sakshi on 20/7/17 */
				mobile_no: $rootScope.logged_mobile_no
				/* add ended */
			}
		}).then(function(response){
			console.log(response.data);
			$scope.detail=response.data;
		})
		
		$scope.get_history_patient=function(){
		console.log("getting details of patient");

		$http({
			method: 'POST',
			url: 'http://api.bloodport.in/dashboard/get_patient_data',
			data: {
				/* addded by sakshi on 20/7/17 */
				email: $rootScope.logged_email
				/* add ended */
			}
		}).then(function(response){
			console.log(response.data);
			$scope.detail=response.data;
		})
	}
	}
})

app.controller('hospitalController',function($scope,$http,$rootScope,$state){
	console.log("hospitalController called");
	$rootScope.dahsboardtitle="Find Hospital";
	$scope.styles={'background-color' : '#c62828','color':'white'};
	$scope.style1=$scope.styles;

	$http({
		method:'GET',
		url:'http://api.bloodport.in/hospital/all_hospitals',
	}).then((res)=>{
		//console.log(res.data);
		$rootScope.hospitals=res.data;
		$rootScope.oneHospital=$rootScope.hospitals;
		console.log($rootScope.hospitals);
	});

	$scope.allHospitals=function(){
		$http({
			method:'GET',
			url:'http://api.bloodport.in/hospital/all_hospitals',

		}).then((res)=>{
			$rootScope.hospitals=res.data;
			$rootScope.oneHospital=$rootScope.hospitals;
		})
	}

	$scope.check=function(){
		if(($scope.user_modal_name==null)||($scope.user_modal_dob==null)||($scope.user_modal_gender==null))
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	$scope.update_modal_details=function(){
		console.log('update_modal_details caled');
		$http({
			method: 'POST',
			url:'http://api.bloodport.in/register/update_modal_details',
			data:{
			user_name: $scope.user_modal_name,
			user_dob: $scope.user_modal_dob,
			user_gender: $scope.user_modal_gender,
			user_password: $scope.user_modal_pass,
			user_mobile_no: $rootScope.logged_mobile_no
			}
		}).then(function(response){
			$rootScope.emergency_user=false;
			Materialize.toast('details added',3000,'red-darken3');
			$state.go('dashboard.bloodsure');	
		})
	}
	if($rootScope.emergency_user)
	{
		
		$('#modal1').show();
		$('#modal1').css({
			zIndex: 16,
		});
	}
	else{
	}
	

	$scope.getHospitalsBylocations=function(){
		if($scope.hospitalLocation=="Delhi")
		{

			$http({
			method:'POST',
			url:'http://api.bloodport.in/hospital/sortByLocationDelhi'
			}).then((response)=>{
				$rootScope.hospitals=response.data;
			})
		}
		if($scope.hospitalLocation=="ncr")
		{
			$http({
				method:'POST',
				url:'http://api.bloodport.in/hospital/sortByLocationNCR',

			}).then((response)=>{
				$rootScope.hospitals=response.data;
			})
		}
		
	}

	$scope.getHospitalsByName=function(){

		$http({
			method:'POST',
			url:'http://api.bloodport.in/hospital/sortByName',
			data:{
				hospital_name:$scope.hospitalName
			}
		}).then((res)=>{
			$rootScope.oneHospital=res.data;
			//console.log(res.data);
			$rootScope.hospitals=$rootScope.oneHospital;
			console.log($rootScope.oneHospital);
			
		}).then(()=>{
				$http({
				method:'GET',
				url:'http://api.bloodport.in/hospital/all_hospitals',

				}).then((res)=>{
					//$rootScope.hospitals=res.data;
					$rootScope.oneHospital=res.data;
				})

			})

	}
})

app.controller('footerController',function(){
	console.log("footerController called");
})

app.controller('privacyController',function(){
	console.log("privacyController called");
})

app.controller('tandcController',function(){
	console.log('tandcController called');
})

app.controller('legalController',function(){
	console.log('legalController called');
})
app.controller('faqController',function(){
	console.log('faqController called');
})
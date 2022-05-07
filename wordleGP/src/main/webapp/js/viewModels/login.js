define([ 'knockout', 'appController', 'ojs/ojmodule-element-utils', 'accUtils',
		'jquery' ], function(ko, app, moduleUtils, accUtils, $) {

	class LoginViewModel {
		constructor() {
			var self = this;
			
			self.userName = ko.observable();
			self.pwd = ko.observable();
			self.email = ko.observable();
			self.message = ko.observable();
			self.error = ko.observable();
			
			// Header Config
			self.headerConfig = ko.observable({
				'view' : [],
				'viewModel' : null
			});
			moduleUtils.createView({
				'viewPath' : 'views/header.html'
			}).then(function(view) {
				self.headerConfig({
					'view' : view,
					'viewModel' : app.getHeaderModel()
				})
			})
		}

		login() {
			var self = this;
			var info = {
				name : this.userName(),
				pwd : this.pwd()
			};
			var data = {
				data : JSON.stringify(info),
				url : "user/login",
				type : "put",
				contentType : 'application/json',
				success : function(response) {
					app.router.go( { path : "menu"} );
				},
				error : function(response) {
					self.error(response.responseText);
				}
			};
			$.ajax(data);
		}
		
		sendEmail() {
			var self = this;
			var info = {
				email : this.email()
			};
			var data = {
				data : JSON.stringify(info),
				url : "user/createToken",
				type : "put",
				contentType : 'application/json',
				success : function(response) {
					self.error("");
					self.message(response);
				},
				error : function(response) {
					self.message("");
					self.error(response.responseText);
				}
			};
			$.ajax(data);
		}
		
		register() {
			app.router.go( { path : "register" } );
		}
		
		changePassword() {
			app.router.go( { path : "changePassword" } );
		}


		connected() {
			accUtils.announce('Login page loaded.');
			document.title = "Login";
		};

		disconnected() {
			// Implement if needed
		};

		transitionCompleted() {
			// Implement if needed
		};
	}

	return LoginViewModel;
});

define([ 'knockout', 'appController', 'ojs/ojmodule-element-utils', 'accUtils',
		'jquery' ], function(ko, app, moduleUtils, accUtils, $) {

	class RecuperarPasswordViewModel {
		constructor() {
			var self = this;
			
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

	return RecuperarPasswordViewModel;
});
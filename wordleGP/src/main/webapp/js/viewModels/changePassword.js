/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define([ 'knockout', 'appController', 'ojs/ojmodule-element-utils', 'accUtils',
		'jquery' ], function(ko, app, moduleUtils, accUtils, $) {

	class changePasswordViewModel {
		constructor() {
			var self = this;
		
			self.userName = ko.observable("");
			self.pwd = ko.observable("");
			self.newpwd1 = ko.observable("");
			self.newpwd2 = ko.observable("");

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
		
		changePassword () {
			var self = this;
			var info = {
				userName : this.userName(),
				pwd : this.pwd(),
				newpwd1 : this.newpwd1(),
				newpwd2 : this.newpwd2(),		
			};
			var data = {
					data : JSON.stringify(info),
					url : "user/changePassword",
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
			accUtils.announce('changePassword page loaded.');
			document.title = "changePassword";
		};

		disconnected() {
			// Implement if needed
		};

		transitionCompleted() {
			// Implement if needed
		};

	}

	return changePasswordViewModel;
});
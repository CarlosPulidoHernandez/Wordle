define([ 'knockout', 'appController', 'ojs/ojmodule-element-utils', 'accUtils',
		'jquery' ], function(ko, app, moduleUtils, accUtils, $) {

	class MenuViewModel {
		constructor() {
			let self = this;
			self.status = ko.observable(null)
			self.error = ko.observable(null)
			
			self.match = ko.observable(null)
			self.testWord = ko.observable(null)
						
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
			
			self.open()
		}

		connected() {
			accUtils.announce('Menu page loaded.');
			document.title = "Menu";
		}
		
		open() {
			let self = this;
			
			let data = {
				url : "match/open",
				type : "get",
				contentType : 'application/json',
				success : function(response) {
					let url = response
					self.connectWebSocket(url)
				},
				error : function(response) {
					self.error(response);
				}
			};
			$.ajax(data);
		}
		
		guess() {
			let mensaje = {
				idMatch : this.match().id,
				type : "GUESS",
				game : "WORDLE",
				testWord : this.testWord()
			}
			this.ws.send(JSON.stringify(mensaje))
		}
		
		playMatch() {
			let self = this;
			
			let data = {
				url : "match/play",
				type : "get",
				contentType : 'application/json',
				success : function(response) {
					self.match(response)
				},
				error : function(response) {
					self.error(response);
				}
			};
			$.ajax(data);
		}
		
		connectWebSocket(url) {
			let self = this
			this.ws = new WebSocket(url)
			this.ws.onopen = function() {
				self.status("WebSocket conectado")
			}			
			
			this.ws.onmessage = function(event) {
				let data = JSON.parse(event.data)
				if (data.type=="READY") {
					self.match(data)
					self.status("Partida preparada")
				}
			}
		}

		disconnected() {
			// Implement if needed
		};

		transitionCompleted() {
			// Implement if needed
		};
	}

	return MenuViewModel;
});

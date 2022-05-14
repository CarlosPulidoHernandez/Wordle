define([ 'knockout', 'appController', 'ojs/ojmodule-element-utils', 'accUtils',
		'jquery' ], function(ko, app, moduleUtils, accUtils, $) {

	class MenuViewModel {
		constructor() {
			let self = this;
			self.status = ko.observable(null)
			self.error = ko.observable(null)
			
			self.mensajeFinal = ko.observable(null)
			
			self.match = ko.observable(new Match(ko))
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
				idMatch : this.match().id(),
				type : "GUESS",
				game : "WORDLE",
				testWord : this.testWord()
			}
			this.ws.send(JSON.stringify(mensaje))
		}
		
		playMatch() {
			let self = this;
			self.match(new Match(ko))
			self.mensajeFinal(null)
			
			let data = {
				url : "match/play",
				type : "get",
				contentType : 'application/json',
				success : function(response) {
					self.match().id(response.id)
					self.match().miRol = response.playerB ? "B" : "A"
					self.match().playerA(response.playerA)
					self.match().playerB(response.playerB)
				},
				error : function(response) {
					self.error(response.responseJSON.message);
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
					self.match().id(data.id)
					self.match().playerB(data.playerB)
					self.status("Partida preparada")
				} else if (data.type=="UNO HA PUESTO, OYE") {
					if (data.quien=="A" && self.match().miRol=="A")
						self.match().guessesA.push(dibujar(data.guessesA[data.guessesA.length-1]))
					else if (data.quien=="A" && self.match().miRol=="B")
						self.match().guessesB.push(dibujar(data.guessesA[data.guessesA.length-1]))
					else if (data.quien=="B" && self.match().miRol=="A")
						self.match().guessesB.push(dibujar(data.guessesB[data.guessesB.length-1]))
					else
						self.match().guessesA.push(dibujar(data.guessesB[data.guessesB.length-1]))
						
					if (data.winner) {
						if (data.winner==self.match().miRol)
							self.mensajeFinal("¡¡Has ganado!! 😁")
						else
							self.mensajeFinal("Ohhh, has perdido 😞")
					}
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
	
	function dibujar(data) {
		let word = data.testWord
		let state = data.state
		let r = "";
		for (let i=0; i<word.length; i++) {
			r = r + "<span style='color :"
			if (state[i]=="M")
				r = r + "green'>"
			else if (state[i]=="H")
				r = r + "orange'>"
			else if (state[i]=="V")
				r = r + "red'>"
			r = r + word[i] + "</span>"
		}
		return r
	}

	return MenuViewModel;
});

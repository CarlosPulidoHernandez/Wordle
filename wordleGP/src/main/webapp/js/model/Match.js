class Match {
	constructor(ko) {
		this.id = ko.observable(null)
		this.playerA = ko.observable(null)
		this.playerB = ko.observable(null)
		this.guessesA = ko.observableArray([])
		this.guessesB = ko.observableArray([])
	}
}
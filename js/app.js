(function (window, document) {
	'use strict';

	/**
	* # Initialize the application
	*/
	function ListApp(document, app) {
		app = app || {};

		if (
			!('Model' in app) ||
			!('View' in app) ||
			!('Controller' in app)
		) {
			throw 'List: One or more modules are missing.';
		}

		this.model = new app.Model();
		this.view = new app.View(document);
		this.controller = new app.Controller(this.model, this.view);
	}

	function initializeApp() {
		try {
			var listApp = new ListApp(document, window.app);
			return true;
		}
		catch(error) {
			console.error(error);
			return false;
		}
	}

	window.app = window.app || {};
	window.app.isInitialized = initializeApp();
})(window, document);

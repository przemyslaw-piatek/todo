(function(window) {
	'use strict';

	function Controller(model, view) {
		var _this = this;

		if (typeof(model) === 'undefined') throw 'Controller: Model is not defined';
		else _this.model = model;

		if (typeof(view) === 'undefined') throw 'Controller: View is not defined';
		else _this.view = view;

		_this.view.bind('addItem', function(content) {
			_this.addItem(content);
			_this.updateItemsCount();
		});

		_this.view.bind('removeItem', function(id) {
			_this.removeItem(id);
			_this.updateItemsCount();
		});
	}

	Controller.prototype.updateItemsCount = function() {
		var _this = this;

		var items_count = _this.model.getItemsCount();

		_this.view.setItemsCount(items_count);
	}

	Controller.prototype.addItem = function(content) {
		var _this = this;

		var trimmed_content = content.trim();
		
		if (!trimmed_content) return;

		var new_item = _this.model.add(trimmed_content);
		_this.view.add(new_item);

		_this.view.clearInput();
	}

	Controller.prototype.removeItem = function(id) {
		var _this = this;

		var item_removed = _this.model.remove(id);

		if (!item_removed) return false;

		_this.view.remove(id);
		return true;
	}

	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);

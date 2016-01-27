(function(window) {
	'use strict';

	function Model() {
		this.items = [];
	}

	Model.prototype.add = function(content) {
		var _this = this;

		var new_item = {
			content: content,
			id: 'item-' + Date.now()
		};

		_this.items.push(new_item);

		return new_item;
	}

	Model.prototype.remove = function(id) {
		var _this = this;

		var item_to_remove = _this.find(id);

		if (!('element' in item_to_remove)) return false;

		_this.items.splice(item_to_remove.index, 1);

		return true;
	}

	Model.prototype.find = function(id) {
		var _this = this;

		var result = {};

		_this.items.forEach(function(item, index) {
			if (item.id === id) {
				result = {
					element: item,
					index: index
				}
				return false;
			}
		});

		return result;
	}

	Model.prototype.getItemsCount = function() {
		return this.items.length;
	}

	window.app = window.app || {};
	window.app.Model = Model;
})(window);

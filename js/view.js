(function(window) {
	'use strict';

	function View(document) {
		this.ui = {
			$listContainer: 		document.getElementById('listContainer'),
			$addItemBtn:			document.getElementById('addItemBtn'),
			$listInput:				document.getElementById('listInput'),
			$itemsCount:			document.getElementById('itemsCount'),
			$itemTemplateContainer:	document.getElementById('itemTemplate')
		};

		this.template = this.ui.$itemTemplateContainer.innerHTML;
	}

	View.prototype.bind = function(event, handler) {
		var _this = this;

		switch (event) {
			case 'addItem':
				_this.ui.$addItemBtn.addEventListener('click', function() {
					handler(_this.ui.$listInput.value);
				});
				break;
			case 'removeItem':
				_this.ui.$listContainer.addEventListener('click', function(e) {
					var target = e.target || e.srcElement;
					if (target.nodeName.toLowerCase() !== 'button') return;
					
					var id = _this.getIdFromElement(e.target);
					handler(id);
				});
				break;
		}
	}

	View.prototype.getIdFromElement = function(element) {
		return element.dataset.id;
	}

	View.prototype.add = function(model) {
		var _this = this;

		var parsed_template = _this.parseTemplate(model);

		var temp_element = document.createElement('div');
		temp_element.innerHTML = parsed_template;
		var $parsed_template = temp_element.firstChild;

		_this.ui.$listContainer.appendChild($parsed_template);
	}

	View.prototype.remove = function(id) {
		var _this = this;
		var $item_to_remove = _this.ui.$listContainer.getElementsByClassName(id)[0];

		_this.ui.$listContainer.removeChild($item_to_remove);
	}

	View.prototype.parseTemplate = function(model) {
		var _this = this;

		var parsed_template = _this.template;
		parsed_template = parsed_template.replace(/\${id}/g, model.id);
		parsed_template = parsed_template.replace(/\${content}/g, model.content);

		return parsed_template;
	}

	View.prototype.setItemsCount = function(count) {
		var _this = this;

		var items_count_string = [
			count,
			count===1 ? 'item' : 'items'
		].join(' ');

		_this.ui.$itemsCount.innerHTML = items_count_string;
	}

	View.prototype.clearInput = function() {
		var _this = this;

		_this.ui.$listInput.value = '';
	}

	window.app = window.app || {};
	window.app.View = View;
})(window);

"use strict";

class Item {

	constructor(items) {
		this.leng = items.length
		this.item = []
		for (var i = 0; i < this.leng; i++) {
			this.item[i] = items[i]
		}
	}
	get prices() {
		return this.total
	}
	set prices(item) {
		this.item = item
		let EspressoPrices = {
			default: 60,
			Milk: 60,
			Cream: 75,
			Latte: 100
		}
		let CappuccinoPrices = {
			default: 80,
			Milk: 80,
			Cream: 90,
			Latte: 125
		}
		let LattePrices = {
			default: 100,
			Milk: 100,
			Cream: 125,
			Latte: 150
		}
		this.total = 0
		for (let i = 0; i < this.item.length; i++) {
			if (this.item[i].name.includes('espresso')) {
				this.total += this.item[i].quantity * EspressoPrices.default
				if (this.item[i].addOns.milk) {
					this.total += this.item[i].quantity * EspressoPrices.Milk
				}
				if (this.item[i].addOns.cream) {
					this.total += this.item[i].quantity * EspressoPrices.Cream
				}
				if (this.item[i].addOns.latte) {
					this.total += this.item[i].quantity * EspressoPrices.Latte
				}
			}
			if (this.item[i].name.includes('cappucino')) {
				this.total = this.item[i].quantity * CappuccinoPrices.default
				if (this.item[i].addOns.milk) {
					this.total += this.item[i].quantity * CappuccinoPrices.Milk
				}
				if (this.item[i].addOns.cream) {
					this.total += this.item[i].quantity * CappuccinoPrices.Cream
				}
				if (this.item[i].addOns.latte) {
					this.total += this.item[i].quantity * CappuccinoPrices.Latte
				}
			}
			if (this.item[i].name.includes('latte')) {
				this.total = this.item[i].quantity * LattePrices.default
				if (this.item[i].addOns.milk) {
					this.total += this.item[i].quantity * LattePrices.Milk
				}
				if (this.item[i].addOns.cream) {
					this.total += this.item[i].quantity * LattePrices.Cream
				}
				if (this.item[i].addOns.latte) {
					this.total += this.item[i].quantity * LattePrices.Latte
				}
			}
		}
	}
}
class CoffeeShop extends Item {
	constructor(...items) {
		super(items)
		this.items = items
	}
	display() {
		let receipt = '<h2>Your Receipt</h2>'
		for(let i = 0; i < this.items.length; i++) {
			let z = i+1
			receipt += '<h3>Item' + z + '</h3>' + this.items[i].name + ':' + this.items[i].quantity + '<br>'
		}
		receipt += '<br>Total : ' + super.prices 
		$('#bill-id').slideDown().html(receipt)	
		//console.log(receipt)
		alert(super.prices)
	}
}

$(document).ready(function () {
	$('#submit-order-id').click(function (event) {
		event.preventDefault();
		
		let item1a = {
			quantity: $('[name = "item1-quantity"]').val(),
			name: $('[name = "item1-name"]').val(),
			addOns: {
				milk: $('[name = "item1-addon1"]').is(':checked') ? 1 : 0,
				cream: $('[name = "item1-addon2"]').is(':checked') ? 1 : 0,
				latte: $('[name = "item1-addon3"]').is(':checked') ? 1 : 0
			}
		}
		let item2a = {
			quantity: $('[name = "item2-quantity"]').val(),
			name: $('[name = "item2-name"]').val(),
			addOns: {
				milk: $('[name = "item2-addon1"]').is(':checked') ? 1 : 0,
				cream: $('[name = "item2-addon2"]').is(':checked') ? 1 : 0,
				latte: $('[name = "item2-addon3"]').is(':checked') ? 1 : 0
			}
		}
		let item3a = {
			quantity: $('[name = "item3-quantity"]').val(),
			name: $('[name = "item3-name"]').val(),
			addOns: {
				milk: $('[name = "item3-addon1"]').is(':checked') ? 1 : 0,
				cream: $('[name = "item3-addon2"]').is(':checked') ? 1 : 0,
				latte: $('[name = "item3-addon3"]').is(':checked') ? 1 : 0
			}
		}

		console.log(item1a,item2a,item3a)
		let orderVar = new CoffeeShop(item1a,item2a,item3a)
		orderVar.display()
	})
})
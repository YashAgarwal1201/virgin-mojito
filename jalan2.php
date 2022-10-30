
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Jalan Test 2</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<style>
		* {
			box-sizing: border-box;
		}
		html {
			max-width: 100%;
			height: 100%;
		}
		body {
			padding: 5px;
			text-align: center;
			background-color: tan;
		}
		.menu {
			width: 400px;
			margin: auto;
		}
		.menu table {
			display: inline-table;
			width: 100%;
			font-weight: bold;
		}
		table td {
			padding: 7px;
			background-color: saddlebrown;
			color: white;
		}
		.order {
			margin-top: 100px;
			width: 100%;
			padding: 25px;
			border-radius: 15px;
			background-color: saddlebrown;
			text-align: left;
		}
		.order section {
			cursor: pointer;
			background-color: tan;
			padding: 20px;
			border-radius: 10px;
			margin-bottom: 7px;
		}
		#total {
			display: none;
		}
		.bill {
			display: none;
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
			margin: 10px;
			width: 350px;
			height: 95%;
			border-radius: 15px;
			background-color: saddlebrown;
			box-shadow: 10px 10px 7px black;
		}
		.item {
			display: flex;
			flex-flow: column wrap;
			justify-content: space-around;
			align-items: flex-start;
		}
		.item-name {
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;
			align-items: center;
		}
		.item-addon {
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;
			align-items: flex-start;
		}
		button {
			cursor: pointer;
			display: inline-block;
			background-color: white;
			color: saddlebrown;
			border: none;
			outline: none;
			border-radius: 25px;
			padding: 10px 15px;
		}
	</style>
</head>
<body>
	<h1>Coffee Shop Menu</h1>
	<div class="menu" id="menu-id">
		<table>
			<tr>
				<td>-</td>
				<td>Milk</td>
				<td>Cream</td>
				<td>Latte</td>
			</tr>
			<tr>
				<td>Espresso</td>
				<td>60</td>
				<td>75</td>
				<td>100</td>
			</tr>
			<tr>
				<td>Cappuccino</td>
				<td>80</td>
				<td>90</td>
				<td>125</td>
			</tr>
			<tr>
				<td>Latte</td>
				<td>100</td>
				<td>125</td>
				<td>150</td>
			</tr>
		</table>
	</div>
	<div class="order" id="order-id">
		<h2>Order</h2>
		<form>
			<section class="item" id="item1-id">
				<div class="item-name">
					<label>Espresso (max 10 per order)</label><input type="number" name="item1-quantity" min="0" max="10">
					<input type="hidden" name="item1-name" value="espresso">
				</div>
				<div class="item-addon" id="item1-addon-id">
					<label>Add on</label>
					<input type="checkbox" name="item1-addon1" value="Milk"><label>Milk</label>
					<input type="checkbox" name="item1-addon2" value="Cream"><label>Cream</label>
					<input type="checkbox" name="item1-addon3" value="Latte"><label>Latte</label>
				</div>
			</section>
			<section class="item" id="item2-id">
				<div class="item-name">
					<label>Cappuccino (max 10 per order)</label><input type="number" name="item2-quantity" min="0" max="10">
					<input type="hidden" name="item2-name" value="cappuccino">
				</div>
				<div class="item-addon" id="item2-addon-id">
					<label>Add on</label>
					<input type="checkbox" name="item2-addon1" value="Milk"><label>Milk</label>
					<input type="checkbox" name="item2-addon2" value="Cream"><label>Cream</label>
					<input type="checkbox" name="item2-addon3" value="Latte"><label>Latte</label>
				</div>
			</section>
			<section class="item" id="item3-id">
				<div class="item-name">
					<label>Latte (max 10 per order)</label><input type="number" name="item3-quantity" min="0" max="10">
					<input type="hidden" name="item3-name" value="latte">
				</div>
				<div class="item-addon" id="item3-addon-id">
					<label>Add on</label>
					<input type="checkbox" name="item3-addon1" value="Milk"><label>Milk</label>
					<input type="checkbox" name="item3-addon2" value="Cream"><label>Cream</label>
					<input type="checkbox" name="item3-addon3" value="Latte"><label>Latte</label>
				</div>
			</section>
			<section class="item" id="total">Total</section>
			<button type="submit" id="submit-order-id">Submit Your Order</button>
		</form>
	</div>
	<div class="bill" id="bil-id"></div>
</body>
<script>
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
</script>
</html>
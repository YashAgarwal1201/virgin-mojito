
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>CoffeeShop</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<link rel="stylesheet" type="text/css" href="coffee.css">
</head>
<body>
	<h1 style="text-align: center;">Coffee Shop Menu</h1>
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
<script src="coffee.js"></script>
</html>
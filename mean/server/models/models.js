var mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;

// firstSchema
	var firstSchema = new mongoose.Schema({
		// PROPERTIES
			name: String,
			date: { type: Date, default: new Date() },

		// IMPORTED DOCUMENTS
			// orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],

		//EXPORTED DOCUMENTS
	});


// // orderSchema
// 	var orderSchema = new mongoose.Schema({
// 		// PROPERTIES
// 			quantity: Number,
// 			date: { type: Date, default: new Date() },
			
// 		// IMPORTED DOCUMENTS
// 			product: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
			
// 		// EXPORTED DOCUMENTS
// 			_customer: { type: Schema.ObjectId, ref: 'Customer' },
// 	});


// // productSchema
// 	var productSchema = new mongoose.Schema({
// 		// PROPERTIES
// 			album: String,
// 			artist: String,
// 			designer: String,
// 			quantity: Number,
// 			imageUrl: String,
// 			date: { type: Date, default: Date.now },
// 		// IMPORTED DOCUMENTS
		
// 		// EXPORTED DOCUMENTS
// 			_orders: { type: Schema.ObjectId, ref: 'Order' },
// 	});

	mongoose.model('First', firstSchema);
	// mongoose.model('Order', orderSchema);
	// mongoose.model('Product', productSchema);
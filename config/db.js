const { default: mongoose } = require('mongoose');

const dbURI =
	'mongodb+srv://sandra-k:umwarimu@prettycluster.jreax.mongodb.net/portofolio?retryWrites=true&w=majority';
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => console.log('connected to db'.blue))
	.catch((err) => console.log(err));

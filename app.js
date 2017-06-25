var bodyParser = require('body-parser'),
    express = require('express'),
    app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
   res.send('Please add a Unix timestamp or the natural language form of a date in the url e.g (http://localhost:3000/1450126800 or http://localhost:3000/December%2015,%202015)')
});

app.get('/:date', function(req, res) {
    var date = req.params.date;
    
    var formattedDate = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    var naturalDate = null;
    var unixDate = null;
    
    if(isNaN(date)) {
        naturalDate = new Date(date).toLocaleDateString('en-us', formattedDate);
        unixDate = new Date(date).getTime()/1000;
    } else {
        naturalDate = new Date(date * 1000).toLocaleDateString('en-us', formattedDate);
        unixDate = date;
    }
     
    res.json(
        {
            unix: unixDate,
            natural: naturalDate
        }
    );
});


app.listen(3000);
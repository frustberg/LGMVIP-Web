const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb+srv://frustbergx27:Abhishek%40123@cluster0.sktcmoo.mongodb.net/todolistDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const itemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model('Item', itemSchema);

const item1 = new Item({ name: 'Item 1' });
const item2 = new Item({ name: 'Item 2' });
const item3 = new Item({ name: 'Item 3' });

const defaultItems = [item1, item2, item3];

app.get('/', (req, res) => {
  Item.find({}, (err, foundItems) => {
    if (err) {
      console.log(err);
    } else {
      if (foundItems.length === 0) {
        Item.insertMany(defaultItems, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Default items inserted successfully!');
          }
        });
        res.redirect('/');
      } else {
        res.render('list', { listTitle: 'Today', items: foundItems });
      }
    }
  });
});

app.post('/', (req, res) => {
  const itemName = req.body.newItem;
  const newItem = new Item({ name: itemName });
  newItem.save();
  res.redirect('/');
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
      if (!err){
        res.redirect("/" + listName);
      }
    });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

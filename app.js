const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js"); //acquiring the local js file in form of mudule


const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"]; //saving array of item instead of 1.
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) { //for home route

  const day = date.getDate();
  res.render('list', {
    listTitle: day,
    newListItems: items
  }); //sending both day and items(whenever post request is trigerred).
});


app.post("/", function(req, res) {
  const item = req.body.NewItem;

  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/"); //we are redirectin to home/root route when post request is triggered
  }

})


app.get("/work", function(req, res) { //  for work route
  res.render('list', {
    listTitle: "Work List",
    newListItems: workItems
  })
});
app.post("/work", function(req, res) {
  let item = req.body.NewItem;
  workItems.push(item);
  res.redirect("/work");
})

app.get("/about", function(req, res) {
  res.render("about");
})

app.listen(3000, function() {
  console.log("server started on port 300");
});

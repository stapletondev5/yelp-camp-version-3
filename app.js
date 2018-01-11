var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    Campground   = require("./models/campground"),
    Comment      = require("./models/comment"),
    // User         = require("./models/user"),
    seedDB       = require("./seeds") 
    
    

mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();


    var campgrounds = [
        {name: "Salmon Creek", image: "http://pickwick-dam.com/wp-content/uploads/2015/08/17991101764_fcb19c7311_k.jpg"},
        {name: "Wolf's Howl", image: "https://www.montgomeryparks.org/uploads/2016/08/Little-Bennett-Campground_park_2016_AV_160804_8043475.jpg"},
        {name: "Meowing Mountain", image: "http://www.visitmesaverde.com/media/399916/morefield-campground_mesa-verde_0072_1000x667.jpg?anchor=center&mode=crop&width=750&height=500&rnd=131257466450000000"}
        
        ];


app.get("/", function(req,res){
    res.render("landing");
});
//===========INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
             res.render("index", {campgrounds:allCampgrounds});
        }
    });
});
//========== CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    // Create a new campground and save to DB
    // campgrounds.push(newCampground);
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
             res.redirect("/campgrounds");
        }
    })
    //get data from form and add campgrounds array
    //redirect back to campgrounds page
   
});


//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
  res.render("new.ejs");  
});


//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            res.render("show", {campground: foundCampground});
        }
    });
    //rend show template with that campground
    
});




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yelp camp server has started")
})
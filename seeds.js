var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment     = require("./models/comment");
var data = [
    {
        name: "Clouds Rest",
        image: "https://modernhiker.com/wp-content/uploads/2015/09/Clouds-Rest-11.jpg",
        description: "Its really high up!"
    },
    {
        name: "Forrest meow",
        image: "https://www.petbasics.com/static/media/images/education/Hero-CatInside-565px.jpg",
        description: "Instead of hearing crickets you hear meows..."
    },
    {
        name: "Bears keep",
        image: "https://static.boredpanda.com/blog/wp-content/uploads/2016/09/mother-bear-cubs-animal-parenting-21-57e3a2161d7f7__880.jpg",
        description: "Don't bring any honey"
    }
];




function seedDB(){
    // remove all campgrounds
Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("removed Camgrounds");
          data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        //create a comment for each campground
                        Comment.create({
                            text: "This place is great, but I wish there was internet",
                            author: "homer"
                            
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new comment");
                            }
                        });
                    }
                });
    });
});
    // add a few campgrounds
    
    //add a few comments
    
}   

module.exports = seedDB;
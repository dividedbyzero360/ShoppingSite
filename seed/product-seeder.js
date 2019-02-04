var mongoose=require("mongoose");
var Product=require("../models/product");

mongoose.connect("mongodb://localhost:27017/shopping-new", { useNewUrlParser: true });
var products=[
    new Product({
        imagePath:"https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
        description:"Product 1",
        title:"Thumbnail label",
        price:10
    }),
    new Product({
        imagePath:"https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
        description:"Product 2",
        title:"Thumbnail label",
        price:20
    }),
    new Product({
        imagePath:"https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
        description:"Product 3",
        title:"Thumbnail label",
        price:30
    }),
    new Product({
        imagePath:"https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
        description:"Product 3",
        title:"Thumbnail label",
        price:40
    })
]

for(var i=0; i< products.length;i++){
    products[i].save(function(){
        if(i==products.length)
        {
            mongoose.disconnect();
        }
    });
}


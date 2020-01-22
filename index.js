
let express =require("express");
let app=express();
let port =process.env.PORT || 4900;
let joi =require("@hapi/joi")
console.log(port);
app.use(express.json()); // req.body


let song=[{
    id:1,
    album:"a1",
    singer:"s1",
    duration:"d1"
},
{
    id:2,
    album:"a2",
    singer:"s2",
    duration:"d2"
},
{
    id:3,
    album:"a3",
    singer:"s3",
    duration:"d3"
},
{
    id:4,
    album:"a4",
    singer:"s4",
    duration:"d4"
}]


//fetch all song
app.get("/api",(req,res)=>{
    res.send(song)
})
//fetch  all song by id
app.get("/api/moni/:id", (req, res)=>{
    //let  id=req.params.id;
    //res.send(id);

    let songr =song.find(data=>data.id===parseInt(req.params.id));
    if (!songr){return res.send("invalid")}
    res.send(songr);
}) 
//create song
app.post("/api/create",(req , res)=>{
    let schema =joi.object(
        {album:joi.string().alphanum().max(3) }
    )
    let {error}=schema.validate(req.body);
    if (error){return res.send(error.details[0].message)}
    console.log(result);
   
    let songAdd={
        id: song.length+ 1,
        album: req.body.album,
        singer: req.body.singer,
        duration: req.body.duration
    }
    song.push(songAdd)
    res.send(song);
})
// //update song
app.put("/api/update/:id",(req ,res)=>{

    let updateid = song.find(data=>data.id===parseInt(req.params.id));
    
    // let schema = joi.object(
    //     {album:joi.string().alphanum().max(3)}
    // )
    // let {error}=schema.validate(req.body);
    //if (error){return res.send(error.details[0].message)}

    updateid.album = req.body.album;
    res.send(song);

})
//remove
app.delete("/api/remove/:id", (req, res) => {
let songid = song.find(item => item.id === parseInt(req.params.id));
if (!songid) { return res.status(403).send({ message: "Invalid course id" }) };
let index=song.indexOf(songid)
song.splice(index , 1)

res.send(song);
})



app.listen(port, () => console.log(`port working on ${port}`));

//update




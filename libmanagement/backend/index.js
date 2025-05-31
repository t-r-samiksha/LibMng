const express = require('express')
const app = express()
// const mongoose = require('mongoose')

app.use(express.json());


function generateList(list,key) {
    let result = []
    for (let l of list) {
        if(Array.isArray(l[key])){
            result = [...result,...l[key]]
        }else{
            result = [...result,l[key]]
        }
        
    }
    return result
}

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173'
}));

const Book = require('./models/book');
const User = require('./models/user');
const Notification = require('./models/notification');

const { default: mongoose } = require('mongoose');

mongoose.connect('mongodb://localhost:27017/library',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("connected"))
.catch(err=> console.error(err));

app.get('/recommendations',async (req,res)=>{

    try{
        const data = await Book.find(
                { noofreaders: { $gt: 10000 } },
                { author_name: 1, title: 1, image: 1, _id: 0 }
                );

        res.json(data)
    }catch(err){
        res.status(500).json({ error: 'Failed to fetch books'})
    }

})

app.get('/category',async (req,res)=>{
    try{
        const [total,fiction,mystery,scifi,bio] = [
            await Book.countDocuments(),
            await Book.countDocuments({genres : "Fiction"}),
            await Book.countDocuments({genres : "Mystery"}),
            await Book.countDocuments({genres : "Sci-FI"}),
            await Book.countDocuments({genres : "Biography"})
        ]

        res.json({
            total : total,
            catarray : [fiction,mystery,scifi,bio]
        })

    }catch(err){
        res.status(500).json({ error : "Failed to fetch cateorys"})
    }
})

app.get('/booksearch/top3books',async (req,res)=>{
    try{
        const top3book = await Book.find().sort({noofreaders:-1}).limit(3)
        const bgColors = ["#f97c8c", "#df90c3", "#a4e1f2"];
        const fd = top3book.map((b,index)=>({
            ...b.toObject(),
            top: index+1,
            bgColor: bgColors[index]

        }))

        res.json({top3 : fd})
    }catch(err){
        res.status(500).json({ error : "Failed to fetch cateorys"})
    }
})

app.get('/bookdetails/:title',async (req,res)=>{
    const title = req.params.title;
    try{
        const det = await Book.findOne({title : title})
        res.json({bdet : det})
    }catch(err){
        res.status(500).json({ error : "Failed to fetch cateorys"})
    }
})

app.get('/booksearch/setup',async (req,res)=>{
    try{
        let authors = await Book.find({},{ author_name: 1, _id: 0 })
        let genres = await  Book.find({},{genres : 1, _id: 0});

        genres = generateList(genres,'genres');
        authors = generateList(authors,'author_name');

        res.json({
            authors : authors,
            genres : [...new Set(genres)]
        })
    }catch(err){
        res.status(500).json({ error : "Failed to fetch cateorys"})
    }
})

app.get('/booksearch/search',async (req,res)=>{
    const genres = req.query.genres?req.query.genres.split(','):''
    const author = req.query.author
    const ratingabove = parseInt(req.query.ratingabove)
    const title = req.query.title
    
    console.log('Genres:', genres?genres:[]);
    console.log('Author:', author?author:'All');
    console.log('Rating Above:', ratingabove);

    try{

        let books = []

        if(title){
            const books = await Book.find({
                title: {$regex: title, $options: 'i'}
            })
            res.json(books)
        }

        if(!author && !genres){
            books = await Book.find({rating : {$gte : ratingabove}})
        }else if(author && !genres){
            books = await Book.find({author_name : author,rating : {$gte : ratingabove}})
        }else if(!author && genres){
            books = await Book.find({rating : {$gte : ratingabove},genres : { $in: genres }})
        }else{
            books = await Book.find({author_name : author,rating : {$gte : ratingabove},genres : { $in: genres }})
        }

        res.json(books)
        
    }catch(err){
        res.status(500).json({ error : "Failed to fetch cateorys"})
    }

})

app.get('/booksearch/authoroftheweek',async (req,res)=>{
    try{
        const det = await Book.aggregate(
            [
                {
                    $group: {
                        _id: '$author_name',
                        bookCount: {$sum: 1}
                    }
                },
                {$sort: {bookCount: -1, _id: 1}},
                {$limit: 5}
            ]
        )

        const finala = det.map((o)=>(
            o._id
        ))

        res.json({a: finala})

    }catch(err){
        res.status(500).json({ error : "Failed to fetch cateorys"})
    }
})

app.get('/booksearch/bookoftheweek', async (req,res)=>{
    try{
        const result = await Book.find().sort({rating : -1}).limit(6)
        console.log(result)
        res.json(result)
    }catch(err){
        res.status(500).json({ error : "Failed to fetch cateorys"})
    }
})

app.get('/wishlist',async (req,res)=>{

    const name = req.query.name
    try{
        const det = await User.findOne({ name },{wishlist:1,_id:0})

        const bookcontainer = await Promise.all(
            det.wishlist.map(async (item)=>{
                const book = await Book.findOne({title : item},{title:1,author_name:1,image:1,_id:0})
                return book
                }
            )
        )
        //console.log(bookcontainer)
        res.json(bookcontainer)

    }catch(err){
        res.status(500).json({ error : "Failed to fetch cateorys"})
    }

})

app.post('/addtowishlist',async (req,res)=>{
    const data = req.body;
    try{
        const userobj = await User.findOne({name : data.username})
        userobj.wishlist.push(data.booktitle)
        await userobj.save()
        res.json({success: true})

    }catch(err){
        res.status(500).json({ error : "Failed to fetch cateorys"})
    }
})

app.delete('/removefromwishlist', async (req,res)=>{
    const data = req.body;
    try{
        const userobj = await User.findOne({name : data.username})
        userobj.wishlist = userobj.wishlist.filter(t => t!== data.booktitle)
        await userobj.save()

        res.json({success: true})

    }catch(err){
        res.status(500).json({ error : "Failed to fetch cateorys"})
    }
})

app.get('/user/:username', async (req, res) => {
    const username = req.params.username;

    try {
        const user = await User.findOne({ name: username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

function sub(d1,d2){
    const date1 = new Date(d1)
    const date2 = new Date()

    const result = (date1-date2)/(1000*60*60*24)
    console.log(result)

    return Math.ceil(result)
}

app.get('/currentlyborrowed',async (req,res)=>{
    const name = req.query.name
    console.log(name)
    try{
        const nowuser = await User.findOne({name: name})

        nowuser.books_borrowed.forEach((b)=>{
            const {due_date} = b._doc;
            if(sub(new Date(due_date), new Date())<0){
                b.due_date.setDate(b.due_date.getDate()+7);

                if (nowuser.balance >= 15) {
                    nowuser.balance -= 15;
                    } else {
                    const fine = Number(nowuser.pending_fine || "0");
                    nowuser.pending_fine = String(fine + 15);
                }
            }
        });

        if(new Date().getDate()===1){
            if( nowuser.balance>=45){
                nowuser.balance-=45;
            }else{
                nowuser.pending_fine += (45-nowuser.balance)
                nowuser.balance = 0
            }
        }

        await nowuser.save();

        const finalresult = await Promise.all (nowuser.books_borrowed
            .filter(b => b._doc.returned_date === null)
            .map(async b => {
                const { name, borrow_date, due_date} = b._doc;
                const bookdet = await Book.findOne({title: name},{_id:0,title:1,image:1,author_name:1})
                return {
                title: name,
                author_name : bookdet.author_name,
                image: bookdet.image,
                deadline: sub(new Date(due_date), new Date())
                };
            }));

        //console.log(finalresult);

        res.json(finalresult)

    }catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }

})

app.get('/notification',async (req,res)=>{

    const name = req.query.name
    try{

        const det = await Notification.find({name: name},{_id: 0,name:0})
        //console.log(det,name)
        res.json(det)

    }catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
})

function calcStatus(dueDateString, returnDateString) {
    const dueDate = new Date(dueDateString);
    const today = new Date();

    if (returnDateString) {
        const returnDate = new Date(returnDateString);

        if (returnDate.getTime() > dueDate.getTime()) {
            return 'On Time';
        } else {
            return 'On Time';
        }
    } else {
        if (dueDate.getTime() >= today.getTime()) {
            return 'Due Soon';
        } else {
            return 'Overdue';
        }
    }
}


app.get('/myborrowedbooks',async (req,res)=>{
    const name = req.query.name
    try{

        const det = await User.findOne({name: name},{_id:0, books_borrowed:1});
        // const authorname = await Book.find({})
        const finalresult = await Promise.all(
            det.books_borrowed
            .map(async (b)=>{
                const { name, borrow_date, due_date,returned_date} = b._doc;
                const authorname = await Book.findOne({title: b.name},{author_name:1,_id:0,image: 1});
                return {
                    title: name,
                    bdate: borrow_date,
                    duedate: due_date,
                    author: authorname.author_name,
                    image: authorname.image,
                    status: calcStatus(due_date,returned_date)
                }
            })
        )

        //console.log(finalresult)

        res.json(finalresult)

    }catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
})

function calcType(rdates,ddates,name){
    //console.log(name,rdates,ddates)
    const rdate = new Date(rdates)
    const ddate = new Date(ddates)
    const today = new Date()
    if(rdates!==null){
        //console.log(name,rdates,ddates,'returned')
        return 'returned'
    }else if(ddate.getTime()>today.getTime()){
        // console.log(name,rdates,ddates,'borrowed')
        return 'borrowed'
    }else if(ddate.getTime()<today.getTime()){
        // console.log(name,rdates,ddates,'due')
        return 'due'
    }
}

app.get('/borroweddates',async (req,res)=>{
    const name = req.query.name
    try{
        const det = await User.findOne({name: name},{books_borrowed:1,_id:0});
        const finalresult = det.books_borrowed.map((b)=>{

                const {returned_date,borrow_date,due_date,name} = b._doc;
                return {
                    date: borrow_date,
                    title: name,
                    type: calcType(returned_date,due_date,name)
                }
            })
        

        // console.log(finalresult);

        res.json(finalresult)

    }catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
    
})

app.get('/g',async (req,res)=>{
    const name = req.query.name
    try{
        const det = await User.findOne({name: name});
        let finaldic = {};
        await Promise.all(det.books_borrowed.map(async (d)=>{
            const curdet = await Book.findOne({title: d.name})
            curdet.genres.map((c)=>c in finaldic?finaldic[c]+=1:finaldic[c]=1)
        }))

        //console.log(finaldic);

        const top6 = Object.entries(finaldic).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 6)
        res.json(top6)

    }catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
    
})

function generateMonthlyData(user) {
  // initialize array for 12 months
  const monthlyData = new Array(12).fill(0);

  user.books_borrowed.forEach(book => {
    const date = new Date(book.borrow_date);
    const monthIndex = date.getMonth(); // 0 = Jan, 1 = Feb, ...
    monthlyData[monthIndex]++;
  });

  const total = user.books_borrowed.length;

  return {
    total,
    monthlyData
  };
}

app.get('/progress',async (req,res)=>{
    const name = req.query.name
    try{

        const det = await User.findOne({name: name});
        console.log(generateMonthlyData(det))
        res.json(generateMonthlyData(det))
    }catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
    
})

app.post('/login',async (req,res)=>{
    try{
        const {input,password,type} = req.body;
        console.log(input,password,type)
        let det;
        if(type==='email'){
            det = await User.findOne({email: input})
        }else{
            det = await User.findOne({membership_id: input})
        }
         if (!det) {
            return res.json({ error: 'User not found',success: false });
        }
        console.log(det.password,password,det.password===password)
        if(det.password===password){
            res.json({
                userdata: det.toObject(),
                success: true
            })
        }else{
            res.json({error: "wrong password",success: false})
        }

    }catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
})

app.listen(8080,()=>{
        console.log("server running on port 8080")
    }
)
import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";

const app = express();
app.set('view engine', 'ejs')
const upload = multer({ dest: 'uploads/' });
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({
  extended: true
}));




const readData = () => {
  try {
    const data = fs.readFileSync("./db.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

/*app.post('/books/single', upload.single('irt'), (req, res) => {
  console.log(req.file);
  saveImage(req.file);
 res.send(req.file.path);
});*/



app.get("/", (req, res) => {
  res.render("./index.html");
});

app.get("/books", cors(), (req, res) => {
  const data = readData();
  res.json(data.books);
});

app.get("/books/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const book = data.books.find((book) => book.id === id);
  res.json(book);
});

app.post("/books",upload.single('irt'), cors(),  (req, res) => {
 
  const data = readData();
  const body = req.body;
  console.log(req.file);
  saveImage(req.file);
  const newPath = `uploads/${req.file.originalname}`

  const newBook = {
    id: data.books.length + 1,
    img: newPath,
    ...body,
    };
  data.books.push(newBook);
  writeData(data);
 //res.json(newBook);
 res.redirect("/")

})
function saveImage(file){
  const newPath = `public/uploads/${file.originalname}`;
  fs.renameSync(file.path, newPath)
  return newPath;
 };
 


app.put("/books/:id", (req, res) => {
  const data = readData();
  const body = req.body;
  const id = parseInt(req.params.id);
  const bookIndex = data.books.findIndex((book) => book.id === id);
  data.books[bookIndex] = {
    ...data.books[bookIndex],
    ...body,
  };
  writeData(data);
  res.json({ message: "Book updated successfully" });
});

app.delete("/books/:id", cors(), (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const bookIndex = data.books.findIndex((book) => book.id === id);
  data.books.splice(bookIndex, 1);
  writeData(data);
  res.json({ message: "Book deleted successfully" });
});


app.get('/ejs', function(req, res) {
  res.render('pages/index');
});
app.get('/inicio', function(req, res) {
  const data = fs.readFileSync("./db.json");
  const datos = JSON.parse(data)
  res.render('pages/inicio', datos);
});
app.get('/about', function(req, res) {
  res.render('pages/about');
});
app.get('/ventas', function(req, res) {
  res.render('pages/ventas');
});

app.listen(3000,  () => {
  console.log("Server en 3000");
});


/*app.listen(port, () => {
  console.log("http://"+ IP +":" + port + "/");
});*/

// const express = require('express');
// const multer = require('multer'); 

// const app = express();

// const upload = multer({ dest: 'uploads/' }); //destination folder for uploaded files


// app.post('/upload', upload.any('files'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//       }
  
//     res.send('File uploaded successfully!');
//   });

//   app.listen(3000, () => {
//     console.log('Server started on port 3000');
//   });


//   app.get('/merge-files', (req, res) => {
//     const file1Path = './uploads/test1.txt'; 
//     const file2Path = './uploads/test2.txt'; 
//     const mergedFilePath = './merge/merged.txt'; 
  
//     try {
//       const content1 = fs.readFileSync(file1Path, 'utf8');
//       console.log(content1);
//       const content2 = fs.readFileSync(file2Path, 'utf8');
//       const mergedContent = content1 + content2;
  
//       fs.writeFileSync(mergedFilePath, mergedContent);
  
//       res.send('Files merged successfully.');
//     } catch (error) {
//       res.status(500).send('Error merging files.');
//     }
//   });


  
  

const express = require('express');
const app = express();
const swaggerSetup = require('./swagger');

app.use(express.json());

// Routes
const uploadRoutes = require('./src/routes/upload');
const mergeRoutes = require('./src/routes/merge');
const readRoutes = require('./src/routes/read');

app.use('/upload', uploadRoutes);
app.use('/merge', mergeRoutes);
app.use('/read', readRoutes);

swaggerSetup(app);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const extractTextFromPDF = require('./pdf');
const responsecreate = require('./parse');
const resume =require("./aicontent");
const summary = require("./summary");
const jobdes = require("./jobdes");
const skill = require("./skill");
var cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// app.post('/extract', async (req, res) => {
//   try {
//     const data = req.body;
//     const pdf_url = data.pdf_url;
//     // const pdf_url = "https://firebasestorage.googleapis.com/v0/b/resumecreator-3d8fd.appspot.com/o/resume%2FNipun%20Walia's%20Resume%20(2).pdf?alt=media&token=1c85697f-c2a8-435c-a6e0-74d751d536c5&_gl=1*bvzz67*_ga*NTU3MTI0NzYxLjE2OTYzMjY3MzU.*_ga_CW55HF8NVT*MTY5OTE3NDY2MC4xMS4xLjE2OTkxNzQ2OTEuMjkuMC4w";

//     if (!pdf_url) {
//       return res.status(400).json({ error: 'PDF URL is missing' });
//     }

//     const pdfText = await extractTextFromPDF(pdf_url);
//     const openAIResponse = await responsecreate(pdfText);

//     if (openAIResponse) {
//       return res.status(200).json(openAIResponse);
//     } else {
//       return res.status(500).json({ error: 'Error processing data' });
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.post("/openai", (req,res)=>{
//   res.send(process.env.OPENAI_API_KEY)
// })

// app.post('/text', async (req, res) => {
//   try {
//     const data = req.body;
//     const pdf_url = data.pdf_url;

//     if (!pdf_url) {
//       return res.status(400).json({ error: 'PDF URL is missing' });
//     }

//     const pdfText = await extractTextFromPDF(pdf_url);

//     return res.status(200).json(pdfText);
  
//   } catch (error) {
//     console.error('Error:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.get("/", (req,res)=>{
  res.send("working");
})

// app.post('/return', async (req, res) => {
//     try {
//       const data = req.body;
//       const des= data.description
//       const title= data.title
//       const details= data.details
      
  
//       if (!data) {
//         return res.status(400).json({ error: 'content missing' });
//       }
  
      
//       const openAIResponse = await resume(des,title,details);
  
//       if (openAIResponse) {
//         return res.status(200).json(openAIResponse);
//       } else {
//         return res.status(500).json({ error: 'Error processing data' });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//   });


app.post("/extract", async (req, res) => {
  try {
    const data = req.body;
    const pdf_url = data.pdf_url;
    // const pdf_url = "https://firebasestorage.googleapis.com/v0/b/resumecreator-3d8fd.appspot.com/o/resume%2FNipun%20Walia's%20Resume%20(2).pdf?alt=media&token=1c85697f-c2a8-435c-a6e0-74d751d536c5&_gl=1*bvzz67*_ga*NTU3MTI0NzYxLjE2OTYzMjY3MzU.*_ga_CW55HF8NVT*MTY5OTE3NDY2MC4xMS4xLjE2OTkxNzQ2OTEuMjkuMC4w";

    if (!pdf_url) {
      return res.status(400).json({ error: "PDF URL is missing" });
    }

    const pdfText = await extractTextFromPDF(pdf_url);
    const openAIResponse = await responsecreate(pdfText);

    if (openAIResponse) {
      return res.status(200).json(openAIResponse);
    } else {
      return res.status(500).json({ error: "Error processing data" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/openai", (req, res) => {
  res.send(process.env.OPENAI_API_KEY);
});
app.post("/summary", async (req, res) => {
  try {
    const data = req.body;
    const des = data.description;
    const title = data.title;
    const details = data.details;

    if (!data) {
      return res.status(400).json({ error: "content missing" });
    }

    const openAIResponse = await summary(des, title, details);

    if (openAIResponse) {
      return res.status(200).json(openAIResponse);
    } else {
      return res.status(500).json({ error: "Error processing data" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/jobdes", async (req, res) => {
  try {
    const data = req.body;
    const job = data.job;
    const des = data.description;
    const title = data.title;
    const start_date = job.startDate;
    const end_date = job.endDate;
    const job_title = job.jobTitle;
    const job_des = job.description;

    if (!data) {
      return res.status(400).json({ error: "content missing" });
    }

    const openAIResponse = await jobdes(
      des,
      title,
      start_date,
      end_date,
      job_title,
      job_des
    );

    if (openAIResponse) {
      return res.status(200).json(openAIResponse);
    } else {
      return res.status(500).json({ error: "Error processing data" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/skill", async (req, res) => {
  try {
    const data = req.body;
    const title = data.title;
    const exp = data.employmentHistory;

    if (!data) {
      return res.status(400).json({ error: "content missing" });
    }

    const openAIResponse = await skill(title, exp);

    if (openAIResponse) {
      return res.status(200).json(openAIResponse);
    } else {
      return res.status(500).json({ error: "Error processing data" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

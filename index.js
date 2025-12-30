import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import FormData from "form-data";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;

    const form = new FormData();
    form.append("prompt", prompt);

    const response = await fetch(
      "https://clipdrop-api.co/text-to-image/v1",
      {
        method: "POST",
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY
        },
        body: form
      }
    );

    const buffer = await response.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    res.json({
      image: `data:image/png;base64,${base64Image}`
    });
  } catch {
    res.status(500).json({ error: "Image generation failed" });
  }
});

app.listen(3000);

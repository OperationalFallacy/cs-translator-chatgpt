"use client";
import { ChangeEvent, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Select,
  MenuItem,
  TextField,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import styles from "./page.module.css";

export default function Home() {
  const [textToTranslate, setTextToTranslate] = useState("");
  const [translation, setTranslation] = useState<string | null>(null);
  const [targetLanguage, setTargetLanguage] = useState<string>("en"); // Default language is Russian

  const translateText = async () => {
    try {
      const response = await fetch("/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToTranslate, targetLanguage }),
      });
      const data = await response.json();
      setTranslation(data.translation);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setTargetLanguage(event.target.value as string);
  };

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <Card sx={{ minWidth: 275, width: "100%" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Enter Text to Translate
            </Typography>
            <TextField
              id="outlined-multiline-static"
              label="Enter text here"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={textToTranslate}
              onChange={(e) => setTextToTranslate(e.target.value)}
            />
          </CardContent>
          <CardActions>
            <Select
              value={targetLanguage}
              onChange={handleLanguageChange}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ru">Russian</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
            </Select>
            <Button size="small" onClick={translateText}>
              Translate
            </Button>
          </CardActions>
        </Card>
      </div>

      {translation && (
        <Card sx={{ minWidth: 275, width: "100%", marginTop: 2 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Translation
            </Typography>
            <TextField
              id="outlined-multiline-static"
              label="Translation"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={translation}
              InputProps={{
                readOnly: true,
              }}
            />
          </CardContent>
        </Card>
      )}
    </main>
  );
}

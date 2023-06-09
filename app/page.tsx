"use client";
import Image from "next/image";
import styles from "./page.module.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { OpenAIApi, Configuration } from 'openai';
import React, { useState } from "react";

export default function Home() {
  const [translation, setTranslation] = useState<string | null>(null);
  
  const textToTranslate = `
    Word of the Day
    something
    adjective
    well meaning and kindly.
    "a benevolent smile"
  `;

  const aiConfig:  = {
    {apiKey: process.env.OPENAI_API_KEY||''}
  }
  const translateText = async () => {
    try {
      const openai = new OpenAIApi();
      const response = await openai.createCompletion({
        engine: 'text-davinci-002',
        prompt: `Translate the following English text to French:\n${textToTranslate}`,
        max_tokens: 60,
      });

      const translation = response.data.choices[0].text.trim();
      setTranslation(translation);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              something
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={translateText}>
              Translate this
            </Button>
          </CardActions>
          {translation && (
            <Typography variant="body2">Translation: {translation}</Typography>
          )}
        </Card>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}

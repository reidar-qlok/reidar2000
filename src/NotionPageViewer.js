import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Konfigurera Axios-instansen utanför komponenten för återanvändning
const notion = axios.create({
  baseURL: `https://api.notion.com/v1/databases/2e0a2f823ace48ac9aa916f9ffc0d93a/query`,
  headers: {
    'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
    'Notion-Version': '2022-02-22',
    'Content-Type': 'application/json'
  }
});
//url: `https://api.notion.com/v1/databases/${process.env.REACT_APP_NOTION_DATABASE_ID}/query`
// Komponenten som tar emot ett sid-ID som prop
const NotionPageViewer = ({ pageId }) => {
  const [pageData, setPageData] = useState(null); // Håller sidans data
  const [loading, setLoading] = useState(true); // Hantera laddningsstatus

  useEffect(() => {
    // Funktionen definieras och anropas inom useEffect för att undvika useEffect-dependency-varningar
    const getPage = async (pageId) => {
      try {
        const response = await notion.get();
        setPageData(response.data);
        setLoading(false); // Uppdatera laddningsstatus när datan är hämtad
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (pageId) {
      getPage(pageId);
    }
  }, [pageId]); // Sid-ID som dependency så att funktionen körs när sid-ID ändras

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pageData) {
    return <div>No page data found.</div>;
  }

  // Visa sidans titel som ett exempel, anpassa baserat på dina behov
  return (
    <div>
        console.log(pageData);
      <h1>{pageData.properties.title[0].plain_text}</h1>
      {/* Rendera ytterligare sidinformation här */}
    </div>
  );
};

export default NotionPageViewer;
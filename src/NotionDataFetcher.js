import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NotionTable.css';

const NotionDataFetcher = () => {
  const [data, setData] = useState(null);

  const fetchDataFromNotion = () => {
    const payload = {
      // Din payload här
    };

    axios.post('http://localhost:3001/api/notion', payload)
      .then(response => {
        setData(response.data);
        console.log('Data hämtad från Notion:', response.data);
      })
      .catch(error => {
        console.error('Fel vid hämtning från Notion:', error);
      });
  };

  useEffect(() => {
    fetchDataFromNotion();
  }, []);

  if (!data || !Array.isArray(data?.results)) {
    return <p>Laddar data eller ingen data att visa...</p>;
  }
  
  return (
    <div>
      <h1 className="mb-4">Notion Data</h1>
     
  <div className="table-responsive">
  <table className="table table-striped table-hover table-bordered rounded custom-rounded-table">
      <thead className="thead-dark">
          <tr>
            <th>Titel</th>
            <th>Verktyg</th>
            <th>Tags</th>
            <th>Slutdatum</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((page, index) => {
            const formattedDate = page.properties.Date.start?.start
              ? new Date(page.properties.Date.date.start).toLocaleDateString('sv-SE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : 'Datum inte tillgängligt';
  
            return (
              <tr key={index}>
                <td>{page.properties.Name.title[0]?.plain_text ?? 'Ingen titel'}</td>
                <td>{page.properties.Verktyg.rich_text.map(text => text.plain_text).join(', ') ?? 'Inga verktyg'}</td>
                <td>{page.properties.Tags.multi_select.map(tag => tag.name).join(', ') ?? 'Inga tags'}</td>
                <td>{formattedDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default NotionDataFetcher;
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

const API_URL = 'https://fxvqfsxpmnwnenzztlel.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4dnFmc3hwbW53bmVuenp0bGVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MTY0ODYsImV4cCI6MjA2NDk5MjQ4Nn0.TYKW--AfJzYHsEQgodcA2o2VKUoRvMdKM5KeHm-eZvY.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFycWZ2cHluem1tcm9ta3Z0cG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTk3MTQsImV4cCI6MjA2MzIzNTcxNH0.CiGpqOg-PUBZkO3wJN7M7orgsCDRSYb5_EVW7NuS1ZI';

async function giveArticles(order = 'created_at.desc') {
  try {
    const res = await fetch(`${API_URL}?select=*&order=${order}`, {
      headers: {
        apiKey: API_KEY,
      },
    });
    return await res.json();
  } catch (err) {
    console.error('Błąd pobierania:', err);
    return [];
  }
}

function renderArticles(articles) {
  const container = document.getElementById('articles');
  container.innerHTML = articles.map(a => {
    const date = new Date(a.created_at);
    const dateStr = format(date, 'dd MMMM yyyy, HH:mm', { locale: pl });
    return `
      <article class="article">
        <h2>${a.title}</h2>
        <h3>${a.subtitle}</h3>
        <p><em>${a.author} — ${dateStr}</em></p>
        <div>${a.content}</div>
      </article>
      <hr>
    `;
  }).join('');
}

document.getElementById('sort').addEventListener('change', async (e) => {
  const order = e.target.value;
  const articles = await giveArticles(order);
  renderArticles(articles);
});

document.getElementById('sendArticle').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    title: e.target.title.value,
    subtitle: e.target.subtitle.value,
    author: e.target.author.value,
    created_at: e.target.created_at.value,
    content: e.target.content.value,
  };
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        apiKey: API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.status !== 201) throw new Error(`Status: ${res.status}`);
    e.target.reset();
    const articles = await giveArticles(document.getElementById('sort').value);
    renderArticles(articles);
  } catch (err) {
    console.error('Błąd wysyłania:', err);
  }
});

(async function init() {
  const articles = await giveArticles();
  renderArticles(articles);
})();

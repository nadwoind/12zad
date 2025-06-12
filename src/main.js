import { format } from 'date-fns';
import { pl } from 'date-fns/locale'





const giveArticles = async function (order = 'created_at.desc') {
  try {
    const response = await fetch(
      `https://qrqfvpynzmmromkvtpon.supabase.co/rest/v1/article?select=*&order=${order}`, {
      headers: {
        apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFycWZ2cHluem1tcm9ta3Z0cG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTk3MTQsImV4cCI6MjA2MzIzNTcxNH0.CiGpqOg-PUBZkO3wJN7M7orgsCDRSYb5_EVW7NuS1ZI',
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Błąd:", error);
  }
};







const createNewArticle = async ({ title, subtitle, author, created_at, content }) => {
  try {
    const response = await fetch('https://qrqfvpynzmmromkvtpon.supabase.co/rest/v1/article?select=*', {
      method: 'POST',
      headers: {
        apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFycWZ2cHluem1tcm9ta3Z0cG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTk3MTQsImV4cCI6MjA2MzIzNTcxNH0.CiGpqOg-PUBZkO3wJN7M7orgsCDRSYb5_EVW7NuS1ZI',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        subtitle,
        author,
        created_at,
        content
      }),
    });
    if (response.status !== 201) {
      throw new Error(`Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

document.getElementById("sendArticle").addEventListener("submit", async function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const subtitle = document.getElementById("subtitle").value;
  const author = document.getElementById("author").value;
  const created_at = document.getElementById("createdAt").value;
  const content = document.getElementById("content").value;

  await createNewArticle({ title, subtitle, author, created_at, content });
  const datacontent = document.getElementById('articles');
  const articles = await giveArticles();
  const articlesText = articles.map(article =>
    `<div class="article">
      <h2>${article.title}</h2>
      <h3>${article.subtitle}</h3>
      <address>${article.author}</address>
      <time datetime=${article.created_at}>${format(new Date(article.created_at), "dd MMMM yyyy, HH:mm", { locale: pl })}</time>
      <p>${article.content}</p>
    </div>`
  ).join('');
  console.log(articlesText)
  datacontent.innerHTML = articlesText


})


document.getElementById("displayMethodForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const displayValue = document.querySelector('input[name="sort"]:checked')?.value;
  const articles = await giveArticles(displayValue);
  const articlesText = articles.map(article =>
    `<div class="article">
      <h2>${article.title}</h2>
      <h3>${article.subtitle}</h3>
      <address>${article.author}</address>
      <time>${format(new Date(article.created_at), "dd MMMM yyyy, HH:mm", { locale: pl })}</time>
      <p>${article.content}</p>
    </div>`
  ).join('');
  console.log(articlesText)
  const datacontent = document.getElementById('articles');
  datacontent.innerHTML = articlesText;
})


async function init() {
  const datacontent = document.getElementById('articles');
  const articles = await giveArticles();
  const articlesText = articles.map(article =>
    `<div class="article">
      <h2>${article.title}</h2>
      <h3>${article.subtitle}</h3>
      <address>${article.author}</address>
      <time datetime=${article.created_at}>${format(new Date(article.created_at), "dd MMMM yyyy, HH:mm", { locale: pl })}</time>
      <p>${article.content}</p>
    </div>`
  ).join('');
  console.log(articlesText)
  datacontent.innerHTML = articlesText;
}

init();

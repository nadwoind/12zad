import { supabase } from './supabaseClient';
import { format } from 'date-fns';

const form = document.getElementById('sendArticle');
const sortSelect = document.getElementById('sort');
const articlesContainer = document.getElementById('articles');

async function fetchAndRender() {
  const [column, direction] = sortSelect.value.split('.');
  const ascending = direction === 'asc';

  const { data, error } = await supabase
  .from('articles')
  .select('*')
  .order(column, { ascending });

console.log("Supabase data:", data);
console.log("Supabase error:", error);

  if (error) {
    articlesContainer.innerText = 'Błąd: ' + error.message;
    return;
  }

  articlesContainer.innerHTML = data
    .map(a => `
      <article>
        <h3>${a.title}</h3>
        <h4>${a.subtitle || ''}</h4>
        <p><em>${a.author} — ${format(new Date(a.created_at), 'dd-MM-yyyy')}</em></p>
        <div>${a.content}</div>
        <hr />
      </article>
    `)
    .join('');
}

sortSelect.addEventListener('change', fetchAndRender);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const newArticle = {
    title:      fd.get('title'),
    subtitle:   fd.get('subtitle'),
    author:     fd.get('author'),
    created_at: fd.get('created_at'),
    content:    fd.get('content')
  };
  const { error } = await supabase.from('articles').insert([newArticle]);
  if (error) {
    alert('Błąd: ' + error.message);
  } else {
    form.reset();
    fetchAndRender();
  }
});

fetchAndRender();

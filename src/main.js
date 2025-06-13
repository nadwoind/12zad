import { supabase } from './supabaseClient';

const form = document.getElementById('sendArticle');
const sortSelect = document.getElementById('sort');
const articlesContainer = document.getElementById('articles');

async function fetchAndRender(order = { column: 'created_at', ascending: false }) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order(order.column, { ascending: order.ascending });

  if (error) {
    console.error('Błąd podczas pobierania:', error);
    articlesContainer.innerText = 'Wystąpił błąd podczas ładowania artykułów.';
    return;
  }

  articlesContainer.innerHTML = '';
  data.forEach((art) => {
    const el = document.createElement('div');
    el.innerHTML = `
      <h3>${art.title}</h3>
      <h4>${art.subtitle}</h4>
      <p><em>Autor: ${art.author} | Data: ${new Date(art.created_at).toLocaleString('pl-PL')}</em></p>
      <p>${art.content}</p>
      <hr />
    `;
    articlesContainer.appendChild(el);
  });
}

sortSelect.addEventListener('change', () => {
  const [col, dir] = sortSelect.value.split('.');
  fetchAndRender({ column: col, ascending: dir === 'asc' });
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const newArticle = {
    title: formData.get('title'),
    subtitle: formData.get('subtitle'),
    author: formData.get('author'),
    created_at: formData.get('created_at'),
    content: formData.get('content'),
  };

  const { error } = await supabase.from('articles').insert([newArticle]);
  if (error) {
    console.error('Błąd przy wysyłaniu:', error);
    alert('Nie udało się dodać artykułu.');
  } else {
    form.reset();
    fetchAndRender();
  }
});


fetchAndRender();

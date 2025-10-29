document.addEventListener('DOMContentLoaded', function(){
  // router highlight
  const links = document.querySelectorAll('nav a');
  links.forEach(a=> a.classList.toggle('active', a.getAttribute('href') === window.location.pathname.split('/').pop() || (window.location.pathname.endsWith('') && a.getAttribute('href')==='index.html')));
  
  // booking form demo
  const bookingForm = document.getElementById('bookingForm');
  if(bookingForm){
    bookingForm.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('b-name').value.trim();
      const email = document.getElementById('b-email').value.trim();
      if(!name || !email){ alert('Please enter name and email'); return; }
      document.getElementById('bookingMsg').style.display = 'block';
      setTimeout(()=> document.getElementById('bookingMsg').style.display='none', 4500);
      bookingForm.reset();
    });
  }
  
  // support kb search
  const kbBtn = document.getElementById('kbSearchBtn');
  if(kbBtn){
    kbBtn.addEventListener('click', function(){
      const q = document.getElementById('kbQ').value.toLowerCase().trim();
      const out = document.getElementById('kbResults');
      const articles = window.demoArticles || [];
      if(!q){ renderArticles(articles.slice(0,3)); return; }
      const r = articles.filter(a => a.title.toLowerCase().includes(q) || a.snippet.toLowerCase().includes(q));
      renderArticles(r);
    });
  }
  
  function renderArticles(list){
    const out = document.getElementById('kbResults');
    out.innerHTML = '';
    if(!list.length){ out.innerHTML = '<div class="article"><em>No results</em></div>'; return; }
    list.forEach(a=>{
      const d = document.createElement('div'); d.className='article';
      d.innerHTML = '<h4>'+a.title+'</h4><p style="color:#6b7280">'+a.snippet+'</p><div style="margin-top:8px"><button class="btn" onclick="alert(\'Open: '+a.title.replace(/'/g,'\'')+'\')">Open</button> <button class="ghost" onclick="alert(\'Copy to KB: '+a.title.replace(/'/g,'\'')+'\')">Copy to KB</button></div>';
      out.appendChild(d);
    });
  }
  
  window.renderArticles = renderArticles;
  if(window.demoArticles){ renderArticles(window.demoArticles.slice(0,3)); }
});
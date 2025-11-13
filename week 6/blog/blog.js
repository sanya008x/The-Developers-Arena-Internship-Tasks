const STORAGE_KEY = 'sandy_blog_posts';

function uid(){ return 'p_' + Date.now().toString(36) + Math.random().toString(36).slice(2,8); }
function nowString(ts=Date.now()){ return new Date(ts).toLocaleString(undefined,{dateStyle:'medium',timeStyle:'short'}); }
function showToast(msg='Saved',t=2200){ const el=document.getElementById('toast'); el.textContent=msg; el.style.display='block'; setTimeout(()=>el.style.display='none',t);} 

function loadPosts(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY))||[] }catch{ return [] }}
function savePosts(list){ localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }

let posts = loadPosts();
let editingId = null;

const postsListEl = document.getElementById('postsList');
const viewerEl = document.getElementById('viewerInner');
const form = document.getElementById('postForm');
const titleEl = document.getElementById('title');
const contentEl = document.getElementById('content');
const tagsEl = document.getElementById('tags');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const searchEl = document.getElementById('search');
const sortByEl = document.getElementById('sortBy');
const exportBtn = document.getElementById('exportBtn');
const modal = document.getElementById('modalBackdrop');

function truncate(s,n){ return s.length>n ? s.slice(0,n).trim() + '…' : s }
function escapeHtml(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;') }
function parseTags(s){ return s? s.split(',').map(t=>t.trim()).filter(Boolean).slice(0,8) : [] }

function createPost(data){ const p={id:uid(),title:data.title,content:data.content,tags:data.tags,created:Date.now(),updated:Date.now()}; posts.push(p); savePosts(posts); renderPostsList(searchEl.value); showToast('Post created'); return p }
function updatePost(id,data){ const i=posts.findIndex(x=>x.id===id); if(i===-1) return null; posts[i]={...posts[i],...data,updated:Date.now()}; savePosts(posts); renderPostsList(searchEl.value); showToast('Updated'); return posts[i] }
function deletePost(id){ posts=posts.filter(p=>p.id!==id); savePosts(posts); renderPostsList(searchEl.value); renderViewer(null); showToast('Deleted') }
function findPost(id){ return posts.find(p=>p.id===id) }

function renderPostsList(filter=''){
  const q=filter.trim().toLowerCase();
  let list=posts.slice();
  const sortBy=sortByEl.value;
  if(sortBy==='new') list.sort((a,b)=>b.created-a.created);
  else if(sortBy==='old') list.sort((a,b)=>a.created-b.created);
  else if(sortBy==='title') list.sort((a,b)=>a.title.localeCompare(b.title));
  if(q) list=list.filter(p=>p.title.toLowerCase().includes(q)||p.content.toLowerCase().includes(q)||(p.tags||[]).join(' ').toLowerCase().includes(q));

  postsListEl.innerHTML='';
  if(list.length===0){ postsListEl.innerHTML='<div class="empty">No posts</div>'; return; }

  list.forEach(p=>{
    const el=document.createElement('div'); el.className='post-item'; el.dataset.id=p.id;
    el.innerHTML=`
      <div class="post-head">
        <h4>${escapeHtml(p.title)}</h4>
        <div class="meta">${nowString(p.created)}</div>
      </div>
      <div class="meta">${escapeHtml(truncate(p.content,140))}</div>
      <div class="tags">${(p.tags||[]).map(t=>`<span class='tag'>${escapeHtml(t)}</span>`).join('')}</div>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button data-action='read' class='secondary'>Read</button>
        <button data-action='edit' class='secondary'>Edit</button>
        <button data-action='delete' class='danger'>Delete</button>
      </div>`;
    postsListEl.appendChild(el);
  });
}

function renderViewer(post){
  if(!post){ viewerEl.innerHTML='<div class="empty">No post selected</div>'; return; }
  viewerEl.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:start;gap:10px">
      <div>
        <h2>${escapeHtml(post.title)}</h2>
        <div class='meta'>Published: ${nowString(post.created)} ${post.updated!==post.created? ' · Updated: '+nowString(post.updated):''}</div>
        <div class='tags' style='margin-top:10px'>${(post.tags||[]).map(t=>`<span class='tag'>${escapeHtml(t)}</span>`).join('')}</div>
      </div>
      <div class='actions'>
        <button id='viewerEdit' class='secondary'>Edit</button>
        <button id='viewerDelete' class='danger'>Delete</button>
      </div>
    </div>
    <hr />
    <div style="white-space:pre-wrap;line-height:1.6">${escapeHtml(post.content)}</div>`;

  document.getElementById('viewerEdit').addEventListener('click',()=>loadForEdit(post.id));
  document.getElementById('viewerDelete').addEventListener('click',()=>confirmDelete(post.id));
}

function loadForEdit(id){ const p=findPost(id); if(!p) return; editingId=id; titleEl.value=p.title; contentEl.value=p.content; tagsEl.value=(p.tags||[]).join(', '); saveBtn.textContent='Update Post'; window.scrollTo({top:0,behavior:'smooth'}); }

function confirmDelete(id){ openModal(`<h3>Delete post?</h3><p class='muted'>This cannot be undone.</p><div style='margin-top:12px;display:flex;gap:8px'><button id='mdYes' class='danger'>Delete</button><button id='mdNo' class='secondary'>Cancel</button></div>`); document.getElementById('mdYes').addEventListener('click',()=>{closeModal();deletePost(id)}); document.getElementById('mdNo').addEventListener('click',closeModal); }

function openModal(html){ document.getElementById('modalContent').innerHTML=html; modal.style.display='flex'; }
function closeModal(){ modal.style.display='none'; }
modal.addEventListener('click',e=>{ if(e.target===modal) closeModal() });

form.addEventListener('submit',ev=>{
  ev.preventDefault();
  const t=titleEl.value.trim(), c=contentEl.value.trim(), tags=parseTags(tagsEl.value);
  const okT=t.length>=3, okC=c.length>=8;
  document.getElementById('titleError').style.display=okT?'none':'block';
  document.getElementById('contentError').style.display=okC?'none':'block';
  if(!okT||!okC) return;

  if(editingId){ const u=updatePost(editingId,{title:t,content:c,tags}); if(u){renderViewer(u); editingId=null; saveBtn.textContent='Save Post';} }
  else { const p=createPost({title:t,content:c,tags}); renderViewer(p); }

  form.reset();
});

clearBtn.addEventListener('click',()=>{ form.reset(); editingId=null; saveBtn.textContent='Save Post'; });
titleEl.addEventListener('input',()=>{ document.getElementById('titleError').style.display=titleEl.value.trim().length>=3?'none':'block' });
contentEl.addEventListener('input',()=>{ document.getElementById('contentError').style.display=contentEl.value.trim().length>=8?'none':'block' });
postsListEl.addEventListener('click',e=>{ const item=e.target.closest('.post-item'); if(!item) return; const id=item.dataset.id; const btn=e.target.closest('button'); if(!btn){ renderViewer(findPost(id)); return;} const a=btn.dataset.action; if(a==='read') renderViewer(findPost(id)); else if(a==='edit') loadForEdit(id); else if(a==='delete') confirmDelete(id); });
searchEl.addEventListener('input',()=>renderPostsList(searchEl.value));
sortByEl.addEventListener('change',()=>renderPostsList(searchEl.value));
exportBtn.addEventListener('click',()=>{ const blob=new Blob([JSON.stringify(posts,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url;a.download='sandy_blog_posts.json'; a.click(); URL.revokeObjectURL(url); });

function init(){ if(posts.length===0){ posts.push({id:uid(),title:'Welcome to your Blog',content:"This is your personal blog saved in LocalStorage.",tags:['welcome','demo'],created:Date.now(),updated:Date.now()}); savePosts(posts);} renderPostsList(); renderViewer(null);} 

init();

window.__blog_debug={posts:()=>posts,clear:()=>{localStorage.removeItem(STORAGE_KEY);posts=[];renderPostsList();renderViewer(null)}}
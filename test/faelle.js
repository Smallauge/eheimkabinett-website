/* ---------------------------------------------------------------
   DIE FÄLLE – neuester Fall zuerst. Wird von Startseite und Fälle-Seite genutzt.
   Neuer Fall: einen Block kopieren und oben einfügen.
   img         = Standbild des Falls (Hochformat, .webp im Hauptordner)
   yt          = YouTube-Video-ID des Rätsels (das hinter "watch?v=")
   loesung     = YouTube-Video-ID der Lösung, oder "" solange es keine gibt
   loesungText = Lösung als Text (Liste von Absätzen), solange es kein Lösungsvideo gibt
   links       = wo das Rätsel sonst noch läuft
   --------------------------------------------------------------- */
var FAELLE=[
  {id:"fall-2",img:"fall-2.webp",nr:"02",label:"Fall #2",titel:"Vier Restaurants, vier Köche",
   text:"Ein Mafiaboss flieht mitten in einem Filmdreh aus dem Gefängnis. Fast 20 Jahre später kommt ein anonymer Brief. Wo ist er heute?",
   yt:"l5jaFNgSjco",loesung:"",
   links:{YouTube:"https://www.youtube.com/watch?v=l5jaFNgSjco",TikTok:"https://www.tiktok.com/@geheimkabinett/video/7712751126176632097",Facebook:"https://www.facebook.com/reel/1723737849404405"}},
  {id:"fall-1",img:"fall-1.webp",nr:"01",label:"Fall #1",titel:"Das Käse-Foto",
   text:"Ein Dealer schickt ein Foto von einem Stück Käse in einen geheimen Chat. Am Ende bekommt er über 13 Jahre Haft. Was hat ihn verraten?",
   yt:"zsn6kCaG0GQ",loesung:"",
   loesungText:["Seine Finger. Auf dem Foto liegt der Käse in der offenen Hand, Fingerkuppen und Handfläche sind scharf zu sehen.","Ermittler hatten den verschlüsselten Chat geknackt, lasen mit und glichen die Fingerabdrücke direkt vom Foto ab. Das Urteil: über 13 Jahre Haft.","Laden, Ort und Uhrzeit waren falsche Fährten."],
   links:{YouTube:"https://www.youtube.com/watch?v=zsn6kCaG0GQ",TikTok:"https://www.tiktok.com/@geheimkabinett/video/7712199842747157793",Instagram:"https://www.instagram.com/reel/DgLDvuKP4oJ/",Facebook:"https://www.facebook.com/reel/2262014978049878"}},
  {id:"akte-hamburg",img:"fall-flut.webp",nr:"00",label:"Akte Hamburg",titel:"Die Flut",
   text:"Speicherstadt, 03:10 Uhr, Niedrigwasser. Drei Verdächtige, drei Alibis. Einer lügt.",
   yt:"",loesung:"",
   loesungText:["Der Nachtwächter lügt. Er sagt, um 03:05 Uhr habe das Wasser zu hoch gestanden.","Am Tatort hängt aber das Schild: Niedrigwasser, 03:10 Uhr.","Fünf Minuten vor dem tiefsten Stand kann das Wasser nicht zu hoch gewesen sein."],
   links:{Instagram:"https://www.instagram.com/reel/DgKiFY_gTwL/",TikTok:"https://www.tiktok.com/@geheimkabinett/video/7712085351988235553"}}
];

function renderFaelle(root,limit){
  var SHUT='<svg class="shut" viewBox="0 60 200 80" aria-hidden="true"><path d="M8 96 Q100 150 192 96 Q100 132 8 96 Z" fill="#C9A45C"/><g stroke="#C9A45C" stroke-width="3" stroke-linecap="round"><path d="M60 126l-7 13M100 133v14M140 126l7 13"/></g></svg>';
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function embed(id,title){return '<iframe src="https://www.youtube-nocookie.com/embed/'+encodeURIComponent(id)+'?autoplay=1&rel=0&playsinline=1&modestbranding=1" title="'+esc(title)+'" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';}
  function btn(label,attr,icon,cls){return '<button class="play'+(cls||'')+'" type="button" '+attr+'>'+label+'<i aria-hidden="true">'+(icon||'▶')+'</i></button>';}
  var NOTE='<p class="note">Der Klick lädt das Video von YouTube.</p>';

  FAELLE.slice(0,limit||FAELLE.length).forEach(function(f){
    var first=Object.keys(f.links)[0],solved=!!(f.loesung||f.loesungText);
    var pic='<div class="pic" style="background-image:url('+esc(f.img)+')"></div>';
    var raetsel=pic+(f.yt
      ? btn('Rätsel ansehen','data-play="'+esc(f.yt)+'"')+NOTE
      : '<a class="play" href="'+esc(f.links[first])+'" rel="noopener">Ansehen auf '+esc(first)+'<i aria-hidden="true">↗</i></a>');
    var gate='<h3>Schon selbst gerätselt?</h3><p>Dahinter steht die Auflösung. Danach gibt es kein Zurück.</p>';
    var txt=f.loesungText?'<p class="mono mute">Lösung · '+esc(f.label)+'</p>'+f.loesungText.map(function(t,i){return i?'<p>'+esc(t)+'</p>':'<h3>'+esc(t)+'</h3>';}).join(''):'';
    var loesung=f.loesung
      ? gate+btn('Lösung zeigen','data-play="'+esc(f.loesung)+'"')+NOTE
      : f.loesungText
      ? gate+btn('Lösung zeigen','data-reveal','→')
      : SHUT+'<h3>Die Lösung folgt.</h3><p>Dieser Fall ist noch offen. Schreib deine Lösung in die Kommentare und folge uns, damit du die Auflösung nicht verpasst.</p><a class="play line" href="index.html#folgen">Folgen<i aria-hidden="true">→</i></a>';
    var where='<li>Auch auf</li>'+Object.keys(f.links).map(function(k){return '<li><a href="'+esc(f.links[k])+'" rel="noopener">'+esc(k)+'</a></li>';}).join('');

    var el=document.createElement('article');
    el.className='case';el.id=f.id;el.dataset.view='raetsel';
    el.innerHTML=
      '<div class="back" style="background-image:url('+esc(f.img)+')"></div>'+
      '<div class="info">'+
        '<div class="top mono"><span>'+esc(f.label)+'</span><span class="state'+(solved?' done':'')+'">'+(solved?'Gelöst':'Offen')+'</span></div>'+
        '<h2>'+esc(f.titel)+'</h2>'+
        '<p class="teaser">'+esc(f.text)+'</p>'+
        '<div class="switch mono" role="tablist" aria-label="'+esc(f.label)+': Rätsel oder Lösung">'+
          '<button type="button" role="tab" data-view="raetsel" aria-selected="true">Rätsel</button>'+
          '<button type="button" role="tab" data-view="loesung" aria-selected="false">Lösung</button>'+
        '</div>'+
        '<ul class="where mono">'+where+'</ul>'+
      '</div>'+
      '<div class="stage"><div class="pane raetsel">'+raetsel+'</div><div class="pane loesung">'+loesung+'</div></div>';
    root.appendChild(el);
    el._txt=txt;
    el._orig={raetsel:el.querySelector('.pane.raetsel').innerHTML,loesung:el.querySelector('.pane.loesung').innerHTML};
  });

  function setView(el,view){
    if(el.dataset.view===view)return;
    var old=el.querySelector('.pane.'+el.dataset.view);
    if(old.querySelector('iframe'))old.innerHTML=el._orig[el.dataset.view]; // laufendes Video stoppen
    el.dataset.view=view;
    el.querySelectorAll('.switch button').forEach(function(b){b.setAttribute('aria-selected',b.dataset.view===view?'true':'false');});
  }
  root.addEventListener('click',function(e){
    var tab=e.target.closest('.switch button');
    if(tab){setView(tab.closest('.case'),tab.dataset.view);return;}
    var r=e.target.closest('[data-reveal]');
    if(r){r.closest('.pane').innerHTML=r.closest('.case')._txt;return;}
    var p=e.target.closest('[data-play]');
    if(p){p.closest('.pane').innerHTML=embed(p.dataset.play,p.closest('.case').querySelector('h2').textContent);}
  });

  // Direktlinks: #fall-2 oder #fall-2-loesung
  function fromHash(){
    var h=location.hash.replace('#','');if(!h)return;
    var sol=/-loesung$/.test(h),el=document.getElementById(h.replace(/-loesung$/,''));
    if(!el||!el.classList.contains('case'))return;
    if(sol)setView(el,'loesung');
    el.scrollIntoView();
  }
  window.addEventListener('hashchange',fromHash);fromHash();
}

/* Auge in der Kopfzeile: folgt dem Zeiger, blinzelt, schließt sich beim Antippen */
function initEye(){
  var eye=document.getElementById('eye');if(!eye)return;
  var lid=document.getElementById('lid'),look=document.getElementById('look');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches,T=0;
  function aim(x,y){var r=eye.getBoundingClientRect(),dx=x-(r.left+r.width/2),dy=y-(r.top+r.height/2),d=Math.hypot(dx,dy)||1,k=Math.min(1,d/260);look.style.transform='translate('+(dx/d*13*k).toFixed(2)+'px,'+(dy/d*8*k).toFixed(2)+'px)';}
  window.addEventListener('pointermove',function(e){aim(e.clientX,e.clientY);},{passive:true});
  function set(shut){clearTimeout(T);lid.classList.remove('blink');lid.classList.toggle('shut',shut);if(shut)T=setTimeout(function(){set(false);},1600);}
  eye.addEventListener('click',function(e){e.preventDefault();set(!lid.classList.contains('shut'));});
  function wink(){if(lid.classList.contains('shut'))return;lid.classList.remove('blink');requestAnimationFrame(function(){requestAnimationFrame(function(){lid.classList.add('blink');});});}
  // zwinkert alle 1,8 bis 4,2 Sekunden, ab und zu doppelt
  (function loop(d){if(reduce)return;setTimeout(function(){wink();if(Math.random()<.3)setTimeout(wink,380);loop(1800+Math.random()*2400);},d);})(1500);
}

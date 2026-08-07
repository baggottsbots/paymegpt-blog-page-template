(function(){
    var url = (document.querySelector('link[rel=canonical]') || {}).href || location.href.split('#')[0].split('?')[0];
    var title = (document.querySelector('meta[property="og:title"]') || {}).content || document.title;
    var toastEl = document.getElementById('shareToast');
    var toastTimer;
    function toast(msg){
      toastEl.textContent = msg;
      toastEl.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function(){ toastEl.classList.remove('show'); }, 2000);
    }
    function fallbackCopy(u){
      try{
        var t = document.createElement('textarea');
        t.value = u; t.setAttribute('readonly','');
        t.style.position='absolute'; t.style.left='-9999px';
        document.body.appendChild(t); t.select();
        document.execCommand('copy'); document.body.removeChild(t);
        toast('Link copied');
      } catch(e){ toast('Could not copy'); }
    }
    function copy(u){
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(u).then(function(){ toast('Link copied'); }, function(){ fallbackCopy(u); });
      } else { fallbackCopy(u); }
    }
    var eu = encodeURIComponent(url), et = encodeURIComponent(title);
    document.querySelectorAll('[data-share]').forEach(function(el){
      var kind = el.getAttribute('data-share');
      if(kind === 'x'){ el.href = 'https://twitter.com/intent/tweet?text=' + et + '&url=' + eu; }
      else if(kind === 'facebook'){ el.href = 'https://www.facebook.com/sharer/sharer.php?u=' + eu; }
      else if(kind === 'linkedin'){ el.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + eu; }
      else if(kind === 'copy'){ el.addEventListener('click', function(e){ e.preventDefault(); copy(url); }); }
    });
  })();
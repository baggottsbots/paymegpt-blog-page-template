var ham=document.getElementById('ham'),menu=document.getElementById('mobileMenu');
  ham.addEventListener('click',function(){menu.classList.toggle('open');});
  menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){menu.classList.remove('open');});});
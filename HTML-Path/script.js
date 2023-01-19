const passwd = document.getElementById('password');
const confPasswd = document.getElementById('confirm-pwd');

confPasswd.addEventListener('input', checkPwd);
passwd.addEventListener('input', (e) => {
   if (e.target.value !== '') {
      e.target.classList.remove('error');
      if (e.target.value === confPasswd.value) {
         pwdChecked = true;
         passwd.classList.remove('error');
         confPasswd.classList.remove('error');
      } else {
         pwdChecked = false;
         passwd.classList.add('error');
         confPasswd.classList.add('error');
      }
   } else {
      e.target.classList.add('error');
   }
});

function checkPwd(e) {
   if (e.target.value === passwd.value) {
      pwdChecked = true;
      passwd.classList.remove('error');
      confPasswd.classList.remove('error');
   } else {
      pwdChecked = false;
      passwd.classList.add('error');
      confPasswd.classList.add('error');
   }
}

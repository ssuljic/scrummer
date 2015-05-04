scrummer.config(function($translateProvider) {
  $translateProvider.translations('en', {
    DASHBOARD: 'Dashboard',
    BUTTON_TEXT_EN: 'En*',
    BUTTON_TEXT_BS: 'Bs',
    LOGOUT: 'Logout',
    LOGIN: 'Login',
    SIGNUP: 'Sign up',
    WELCOME: 'Welcome to Scrummer :)',
    FIRSTNAME: 'Firstname',
    EMAIL: 'E-mail:',
    PASSWORD: 'Password:',
    FORGOT_PASS: 'Forgot password?',
    FIRSTNAME: 'Firstname:',
    LASTNAME: 'Lastname:',
    USERNAME: 'Username:',
    PASSWORD_CONFIRM: 'Re-type your password:',
    BACK_TO_HOME: 'Back to Home',
    SUBMIT: 'Submit'
  })
  .translations('bs', {
    DASHBOARD: 'Komandna Tabla',
    BUTTON_TEXT_EN: 'En',
    BUTTON_TEXT_BS: 'Bs*',
    LOGOUT: 'Odjava',
    LOGIN: 'Prijava',
    SIGNUP: 'Registracija',
    WELCOME: 'Dobrodosli na Scrummer :)',
    FIRSTNAME: 'Ime:',
    EMAIL: 'E-adresa:',
    PASSWORD: 'Sifra:',
    FORGOT_PASS: 'Zaboravili ste sifru?',
    FIRSTNAME: 'Ime:',
    LASTNAME: 'Prezime:',
    USERNAME: 'Korisnicko ime:',
    PASSWORD_CONFIRM: 'Potvrda sifre:',
    BACK_TO_HOME: 'Nazad na Pocetnu',
    SUBMIT: 'Potvrdi'
  });
   $translateProvider.preferredLanguage('en');
});


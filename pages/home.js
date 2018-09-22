const Page = require('./page');

const LogInModal = {
  elements: {
    btnCloseModal: '',
    modalTitle: '',
    btnSubmit: '',
    btnRecover: '',
    btnSubmitRecover: '',
    btnCloseRecover: '',
    inputLogin: 'input#login',
    inputPassword: 'input#password',
    inputEmailRecover: 'input#email',
    errorEmail: '',
    errorEmailRecover: '',
    errorPasswordToShort: '',
    InvalidPasswordOrEmailError: '',
    messageEmailSent: '',
  }
};

const RegisterModal = {
  elements: {
    btnCloseModal: '',
    modalTitle: '',
    btnSubmit: '',
    inputEmail: 'input#email',
    inputPassword: 'input#password',
    inputConfirmPassword: 'input#passwordConfirmation',
    inputDisplayedName: 'input#displayName',
    errorEmail: '',
    errorPasswordToShort: '',
    errorPasswordNotMatch: '',
    errorUsername: '',
    termsOfService: '',
    privacyPolicy: ''
  }
};

const Home = new Page({
  sections: {
    loginModal: LogInModal,
    registerModal: RegisterModal
  },
  elements: {
    btnOpenSignUp: '',
    btnCloseSignUp: '',
    btnOpenLogin: '',
    btnCloseLogin: '',
    btnCarouselNext: '',
    btnCarouselPrev: '',
    carouselSlideTitle: '',
    nickName: '',
  }
});

module.exports = Home;

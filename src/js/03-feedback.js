import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const parseJson = JSON.parse(localStorage.getItem(STORAGE_KEY));

const formData = { ...parseJson };

const form = document.querySelector('.js-feedback-form');
populateForm();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(e) {
  e.preventDefault();
  const formDataForBackend = new FormData(e.currentTarget)
  formDataForBackend.forEach((name, value) => {
    console.log(value, ': ', name)
  })
  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedForm = parseJson;
  if (savedForm) {
    for (const key in savedForm) {
      document.querySelector(`[name=${key}]`).value = savedForm[key];
    }
  }
}

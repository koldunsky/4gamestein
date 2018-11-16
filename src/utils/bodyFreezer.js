export function freeze() {
  document.querySelector('body').classList.add('frozen');
}

export function unfreeze() {
  document.querySelector('body').classList.remove('frozen');
}
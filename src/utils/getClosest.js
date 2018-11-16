/**
 *
 * @param el {HTMLElement}
 * @param selector {string}
 * @returns {null|HTMLElement}
 */

export default function(el, selector) {
  let matchesFn;

  // find vendor prefix
  ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
    if (typeof document.body[fn] === 'function') {
      matchesFn = fn;
      return true;
    }
    return false;
  });

  let parent;

  // traverse parents
  while (el) {
    if (el && el[matchesFn](selector)) {
      return el;
    }
    el = el.parentElement;
  }

  return null;
}
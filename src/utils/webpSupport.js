export default (callback)=> {
  if (typeof window !== 'undefined') {
    const webP = new Image();

    webP.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wA' +
      'iMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA';
    webP.onload = webP.onerror = () => {
      callback(webP.height === 2);
    };
  }
};
const typeWriter = async (text, delay, onChar, onComplete) => {
  if (typeof onChar !== 'function' || typeof onComplete !== 'function') {
    console.error('typeWriter error: onChar or onComplete not a function');
    return;
  }

  let currentText = '';
  for (let i = 0; i < text.length; i++) {
    currentText += text[i];
    onChar(currentText);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  onComplete();
};

export default typeWriter;

const readBase64MimeType = (base64StringWithMimeType) => {
  let result = null;

  if (typeof base64StringWithMimeType !== 'string') {
    return result;
  }

  const mime = base64StringWithMimeType.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

  if (mime && mime.length) {
    result = mime[1];
  }

  return result;
};

const removeMimeType = (base64StringWithMimeType) => {
  const result = Buffer.from(base64StringWithMimeType.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  return result;
};


export { readBase64MimeType, removeMimeType };

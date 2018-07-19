

const addAtatusConfigToHeadElement = () => {
  const atatusConfig = document.createElement('script');
  atatusConfig.innerHTML = "window._atatusConfig = { apikey: 'ae8d06ae797a47cb8d9bccabeb6114e5', };";
  document.head.appendChild(atatusConfig);
};

const addAtatusScriptToHeadElement = () => {
  const atatusScript = document.createElement('script');
  atatusScript.setAttribute('src', '//dmc1acwvwny3.cloudfront.net/atatus.js');
  document.head.appendChild(atatusScript);
};


const initialiseAtatus = () => {
  addAtatusConfigToHeadElement();
  addAtatusScriptToHeadElement();
};
  
export { initialiseAtatus };
  

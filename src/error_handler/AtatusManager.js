

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

const setAtatusToHandleErrors = (atatus, Vue, _oldOnError) => {
  Vue.config.errorHandler = function VueErrorHandler(error, vm) {
    atatus.notify(error, {
      extra: {
        componentName: Vue.util.formatComponentName(vm),
        propsData: vm.$options.propsData,
      },
    });
        
    if (typeof _oldOnError === 'function') {
      _oldOnError.call(this, error, vm);
    }
  };
};

const trackVueExceptions = () => {
  debugger;
  const { Vue } = window;
  const { atatus } = window;
  
  // quit if Vue isn't on the page
  if (!Vue || !Vue.config) return;
  
  // quit if atatus isn't on the page
  if (!atatus || !atatus.config) return;
  
  const _oldOnError = Vue.config.errorHandler;

  setAtatusToHandleErrors(atatus, Vue, _oldOnError);
};


const initialiseAtatus = () => {
  addAtatusConfigToHeadElement();
  addAtatusScriptToHeadElement();
  window.setTimeout(trackVueExceptions(), 2000);
};
  
export { initialiseAtatus };
  

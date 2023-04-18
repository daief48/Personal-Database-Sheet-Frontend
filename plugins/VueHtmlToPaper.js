
function addStyles(win, styles) {
    styles.forEach((style) => {
      let link = win.document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.setAttribute("href", style);
      win.document.getElementsByTagName("head")[0].appendChild(link);
    });
  }
  
  const VueHtmlToPaper = {
    install(app, options = {}) {
      app.config.globalProperties.$htmlToPaper = (
        el,
        localOptions,
        cb = () => true
      ) => {
        let defaultName = "_blank",
          defaultSpecs = ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
          defaultReplace = true,
          defaultStyles = [];
        let {
          name = defaultName,
          specs = defaultSpecs,
          replace = defaultReplace,
          styles = defaultStyles
        } = options;
  
        // If has localOptions
        // TODO: improve logic
        // if (!!localOptions) {
        //   if (localOptions.name) name = localOptions.name;
        //   if (localOptions.specs) specs = localOptions.specs;
        //   if (localOptions.replace) replace = localOptions.replace;
        //   if (localOptions.styles) styles = localOptions.styles;
        // }
  
        // specs = !!specs.length ? specs.join(",") : "";
  
        const element = window.document.getElementById(el);
  
        if (!element) {
          alert(`Element to print #${el} not found!`);
          return;
        }
  
        const url = "";
        const win = window.open(url, name, specs, replace);
  
        win.document.write(`
          <html>
            <head>
              <title>${window.document.title}</title>
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
              <style>
                  #PrintTable {
                    font-family: Arial, Helvetica, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                  }
                  
                  #PrintTable td, #applicant th {
                    border: 1px solid #ddd;
                    padding: 8px;
                  }
                  
                  #PrintTable tr:nth-child(even){background-color: #f2f2f2;}
                  
                  #PrintTable tr:hover {background-color: #ddd;}
                  
                  #PrintTable th {
                    padding-top: 12px;
                    padding-bottom: 12px;
                    text-align: left;
                    background-color: #04AA6D;
                    color: white;
                  }
                  .legendItem {
                    margin-top: -36px;
                    background-color: white;
                    padding: 0 7px;
                    display: inline-block;
                    width: auto;
                    line-height: 10px;
                  }
                  
                  .field_set_item {
                      border-width: 2px;
                      border-style: groove;
                      border-color: threedface;
                      padding: 30px;
                  }
                  .bg-cz{
                    padding: 0.375rem 0.75rem;
                    margin-bottom: 10px;
                    font-size: 1rem;
                    font-weight: 400 !important;
                    line-height: 1.5;
                    color: #495057;
                    text-align: left;
                    background-color: #e9ecef;
                    border: 1px solid #ced4da;
                    border-radius: 0.25rem;
                  }
                  #abc .form-control{
                    height:auto !important;
                  }

              </style>
            </head>
            <body>
              ${element.innerHTML}
            </body>
          </html>
        `);
  
        addStyles(win, styles);
  
        setTimeout(() => {
          win.document.close();
          win.focus();
          win.print();
          win.close();
          cb();
        }, 1000);
  
        return true;
      };
    }
  };
  
  export default VueHtmlToPaper;
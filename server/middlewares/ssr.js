const React = require('react');
const ReactDOMServer = require('react-dom/server');

function renderComponentMethod(component, props, options = { doctype: true }) {
  const element = React.createElement(component, {
    ...this.app.locals,
    ...this.locals,

    ...props,
  });

  const html = ReactDOMServer.renderToStaticMarkup(element);
  return options.doctype ? `<!DOCTYPE html>${html}` : html;
}

function renderComponent(req, res, next) {
  res.renderComponent = renderComponentMethod;
  next();
}

module.exports = renderComponent;

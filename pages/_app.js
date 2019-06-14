import React from "react";
import {Provider} from "react-redux";
import App, {Container} from "next/app";
import Head from 'next/head';
import Router from 'next/router';
import withRedux from "next-redux-wrapper";
import makeStore from "../utils/store";
const {fromJS} = require('immutable');
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../utils/getPageContext';
import { initGA, logPageView } from '../utils/analytics';

class GloomhavenApp extends App {
  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  static async getInitialProps({Component, ctx}) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return {pageProps};
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    // Initialize and track page loads
    initGA(process.env.GA_TRACKING_ID);
    logPageView();
    Router.events.on('routeChangeComplete', logPageView);
  }

  render() {
    const {Component, pageProps, store} = this.props;
    return (
      <Container>
        <Head>
          <title>Gloomhaven Monster Tracker</title>
        </Head>
        <Provider store={store}>
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            <MuiThemeProvider
              theme={this.pageContext.theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              <CssBaseline />
              <Component
                pageContext={this.pageContext}
                {...pageProps}
              />
            </MuiThemeProvider>
          </JssProvider>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(GloomhavenApp);

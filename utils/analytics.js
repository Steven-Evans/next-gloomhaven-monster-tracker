import ReactGA from 'react-ga';

export const initGA = (trackingId) => {
  ReactGA.initialize(trackingId);
};

export const logPageView = () => {
  if(ReactGA.ga()) {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
};

export const logLinkClick = (label) => () => {
  ReactGA.event({
    category: 'Navigation',
    action: 'Clicked Link',
    label,
  });
};

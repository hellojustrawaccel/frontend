enum PageKey {
  Home = 'home',
  CV = 'cv',
  Space = 'space',
  Channel = 'channel',
  More = 'more',
}

const PAGES = {
  [PageKey.Home]: '/',
  [PageKey.CV]: '/cv',
  [PageKey.Space]: '/space',
  [PageKey.Channel]: '/channel',
  [PageKey.More]: '/more',
};

export { PageKey, PAGES };

enum PageKey {
  Home = 'home',
  CV = 'cv',
  Space = 'space',
  Blog = 'blog',
  More = 'more',
}

const PAGES = {
  [PageKey.Home]: '/',
  [PageKey.CV]: '/cv',
  [PageKey.Space]: '/space',
  [PageKey.Blog]: '/blog',
  [PageKey.More]: '/more',
};

export { PageKey, PAGES };

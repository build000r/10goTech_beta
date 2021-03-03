const Layout = ({ children, layout }) => {
  // fullpageleaderboard
  // smallleaderboard

  // calculate out the difference in the full and small

  // mobile menu button is 36px

  const x = () => <div style={{ height: "calc(100vh - 36px)" }}>{layout}</div>;

  return <div>{children}</div>;
};

export default Layout;

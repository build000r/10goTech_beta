import "semantic-ui-css/semantic.min.css";
import { useRouter } from "next/router";
import { Footer } from "../components/nav/Footer";
import { SiteHeader } from "../components/nav/SiteHeader";
import { AdminHeader } from "../components/nav/AdminHeader";
import { buildClient } from "../api/build-client";
import { checkExistenceOfSite } from "../hooks/use-site-existence";
import NoSite from "../components/error/site-does-not-exist";
import { useEffect } from "react";
import * as gtag from "../components/util/gtag";
import Layout from "../components/layouts";

function AppComponent({
  Component,
  pageProps,
  user,
  siteExists,
  authUserIsAdmin,
}) {
  const router = useRouter();
  const isAdmin = router.pathname.includes("/admin/[site]");
  const isUser = router.pathname.includes("/user/[site]");

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const renderHeader = () => {
    return !isUser ? (
      <AdminHeader user={user} siteExists={siteExists} />
    ) : (
      <SiteHeader
        user={user}
        siteExists={siteExists}
        authUserIsAdmin={authUserIsAdmin}
      />
    );
  };

  const renderComponent = () => <Component {...pageProps} />;

  const layout = () => (
    <div>
      {renderHeader()}

      <Component {...pageProps} />

      <Footer siteType={isAdmin ? "admin" : "user"} />
    </div>
  );

  const homeLayout = () => (
    <div>
      <AdminHeader user={user} />

      <Component {...pageProps} />

      <Footer siteType={"admin"} />
    </div>
  );

  // mon 8:42 change
  // return <Layout layout={layout()} children={layout}></Layout>;
  return router.pathname === "/" ? homeLayout() : layout();

  // return siteExists ? layout() : <NoSite />;
}

AppComponent.getInitialProps = async (appContext) => {
  const { siteExists, siteInfo } = await checkExistenceOfSite({
    context: appContext.ctx,
  });

  if (!siteExists) {
    return { siteExists };
  }

  const client = buildClient(appContext.ctx);

  const { data: currentUser } = await client.get("/api/users/currentuser");
  const user = currentUser.currentUser;

  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  const authUserIsAdmin = user && user.id === siteInfo.ownerId;

  let domainUrl;

  if (appContext.ctx.req) {
    domainUrl = appContext.ctx.req.headers.host;
  }

  console.log(siteExists);

  return { pageProps, user, siteExists, siteInfo, authUserIsAdmin, domainUrl };
};

export async function getServerSideProps(appContext) {
  const { req, res, query } = appContext.ctx;

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1, stale-while-revalidate=59"
  );

  const { siteExists, siteInfo } = await checkExistenceOfSite({
    context: appContext.ctx,
  });

  if (!siteExists) {
    return { props: { siteExists } };
  }

  const client = buildClient(appContext.ctx);

  const { data: currentUser } = await client.get("/api/users/currentuser");
  const user = currentUser.currentUser;

  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  const authUserIsAdmin = user && user.id === siteInfo.ownerId;

  let domainUrl;

  if (appContext.ctx.req) {
    domainUrl = appContext.ctx.req.headers.host;
  }

  console.log(siteExists);

  console.log(
    "_app getServerSideProps",
    pageProps,
    user,
    siteExists,
    siteInfo,
    authUserIsAdmin,
    domainUrl
  );

  return {
    props: {
      pageProps,
      user,
      siteExists,
      siteInfo,
      authUserIsAdmin,
      domainUrl,
    },
  };
}

export default AppComponent;

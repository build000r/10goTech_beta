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

function AppComponent({
  Component,
  pageProps,
  user,
  siteExists,
  authUserIsAdmin,
}) {
  const router = useRouter();
  const isAdmin = router.pathname.includes("/admin/[site]");

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
    return isAdmin ? (
      <AdminHeader user={user} siteExists={siteExists} />
    ) : (
      <SiteHeader
        user={user}
        siteExists={siteExists}
        authUserIsAdmin={authUserIsAdmin}
      />
    );
  };

  const layout = () => (
    <div>
      {renderHeader()}
      <div style={{ paddingTop: "70px" }}>
        <Component {...pageProps} />
      </div>
      <Footer siteType={isAdmin ? "admin" : "user"} />
    </div>
  );

  // mon 8:42 change
  return layout();

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

  // if (appContext.ctx.req) {
  //   console.log(appContext.ctx.req.headers.host);
  // }

  return { pageProps, user, siteExists, siteInfo, authUserIsAdmin };
};

export default AppComponent;

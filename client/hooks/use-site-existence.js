import { buildClient } from "../api/build-client";
import { useSiteType } from "./use-site-type";

const checkExistenceOfSite = async ({ context }) => {
  try {
    const { data: site } = await buildClient(context).get(
      `/api/site/${context.query.site}`
    );

    const siteExists = useSiteType({
      siteExists: true,
      ownerId: site.ownerId,
      path: context.pathname,
    });

    return { siteExists, siteInfo: site };
  } catch (error) {
    return { siteExists: false, siteInfo: null };
  }
};

export { checkExistenceOfSite };

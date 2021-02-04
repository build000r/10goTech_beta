const useSiteType = ({ siteExists, ownerId, path }) => {
  const checkId = (ownerId) =>
    ownerId === "6006d4536ee4744a9c4a5a57" ? "admin" : "user";

  const checkMatch = (siteType) => path.includes(siteType);

  return !siteExists ? false : checkMatch(checkId(ownerId));
};

export { useSiteType };

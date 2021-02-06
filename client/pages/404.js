import { Router, useRouter } from "next/router";
import { useEffect } from "react";

export default function Custom404() {
  const [onetry, setOneTry] = useState(true);

  const url = useRouter().pathname;
  console.log(useRouter());

  useEffect(() => {
    if (onetry) {
      Router.push(url);
      setOneTry(false);
    }
  }, []);
  return <h1>404 - Page Not Found</h1>;
}

import axios from "axios";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import {
  Image,
  Button,
  Label,
  Icon,
  Segment,
  Pagination,
  Container,
} from "semantic-ui-react";
import DeleteImage from "./DeleteImage";

const Slideshow = ({ productId }) => {
  const [values, setValues] = useState({
    active: 1,
    photos: undefined,
  });

  useEffect(async () => {
    const { data } = await axios.get(`/api/photos/${productId}`);

    setValues({ ...values, photos: data });
  }, []);

  const { active, photos } = values;

  console.log(photos);

  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return btoa(binary);
  };

  const base64Flag = "data:image/jpeg;base64,";

  const next = () => {
    let showIndex = active + 1;
    showIndex = showIndex > photos.length ? 1 : showIndex;
    setValues({ ...values, active: showIndex });
  };

  const prev = () => {
    let showIndex = active - 1;
    showIndex = showIndex === 0 ? photos.length : showIndex;
    setValues({ ...values, active: showIndex });
  };

  const changePhoto = (e) => {
    e.preventDefault();

    if (e.target.outerText === "⟩") {
      return next();
    }

    if (e.target.outerText === "⟨") {
      return prev();
    }

    setValues({ ...values, active: e.target.outerText / 1 });
  };

  const renderPhotoSlideShow = () => {
    return (
      <Segment basic textAlign="center">
        {photos.map((p, i) => {
          const { photo, caption } = p;
          const img = base64Flag + arrayBufferToBase64(photo.data);

          return i + 1 === active ? (
            <Fragment>
              <Image src={img} fluid onClick={next} />
            </Fragment>
          ) : null;
        })}

        <Pagination
          onPageChange={changePhoto}
          activePage={active}
          boundaryRange={0}
          siblingRange={1}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          totalPages={photos.length}
        />
      </Segment>
    );
  };

  return photos !== undefined && photos.length > 0
    ? renderPhotoSlideShow()
    : null;
};
export default Slideshow;

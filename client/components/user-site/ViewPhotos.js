import btoa from "btoa";
import { Image, Card, Input, Button, Form, Container } from "semantic-ui-react";
import DeleteImage from "../util/DeleteImage";
import Router, { useRouter } from "next/router";
import { useRequest } from "../../hooks/use-request";

// delete button per photo

const ViewPhotos = ({ photos }) => {
  // const { doRequest, errors } = useRequest({
  //     url: `/api/photos/${photoId}`,
  //     method: "patch",
  //     body: {},
  //     onSuccess: () => cb(),
  //   });

  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return btoa(binary);
  };

  const path = useRouter().asPath;

  const base64Flag = "data:image/jpeg;base64,";

  return (
    <Container style={{ marginTop: "20px" }}>
      <Card.Group centered>
        {photos.map((photo) => {
          const img = base64Flag + arrayBufferToBase64(photo.photo.data);
          return (
            <Card>
              <Image src={img} wrapped ui={false} />
              <Card.Content>
                <Card.Meta>
                  <Form>
                    <Form.Field>
                      <label>Photo Caption</label>
                      <Input
                        fluid
                        placeholder={photo.caption || "Write caption here..."}
                      />
                    </Form.Field>
                    <Form.Button floated="right">Save Caption</Form.Button>
                  </Form>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <div>
                  <DeleteImage
                    photoId={photo.id}
                    cb={() => {
                      Router.push(path);
                    }}
                  />
                </div>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    </Container>
  );
};

export default ViewPhotos;

/* 




view photos -> handles the gallery
viewphoto component -> handles the updating of the captions and the deletion of it

*/

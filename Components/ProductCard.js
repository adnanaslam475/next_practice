import React from "react";
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/router";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";

const ProductCard = ({ data }) => {
  const router = useRouter();
  
  return (
    <Grid md={6} lg={6} xl={6} item sm={6} xs={12}>
      <Card>
        <CardActionArea disableRipple disableTouchRipple>
          <Carousel showArrows={true} onChange={() => ""}>
            {data.data.images?.map((v) => (
              <div
                key={v}
                className="carousel_inside"
                style={{ position: "relative" }}
              >
                <Image
                  src={v}
                  className="images card_imgs"
                  draggable
                  width="100%"
                  height="100%"
                  onDrag={() => ""}
                  alt="Picture of the author"
                />
                <p className="legend">{data.data?.title}</p>
              </div>
            ))}
          </Carousel>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.data.name}
            </Typography>
            <Typography variant="body2" color="secondary">
              {data.data.details}{" "}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            onClick={() => router.push(`/article/${data.id}`)}
            color="primary"
          >
            Details
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;

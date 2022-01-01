import React from "react";
import { Carousel } from "react-responsive-carousel";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";

const ProductCard = ({ data }) => {
  console.log("data", data);

  return (
    <Grid md={4} item sm={6} xs={12}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <Carousel showArrows={true} onChange={() => ""}>
            {data.data.images?.map((v) => (
              <div key={v} style={{ position: "relative" }}>
                <Image
                  src={v}
                  className="images card_imgs"
                  draggable
                  // layout="fill"
                  width="100%"
                  height="100%"
                  // objectFit="contain"
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
            <Typography variant="body2" color="text.secondary">
              {data.data.details}{" "}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Details
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;

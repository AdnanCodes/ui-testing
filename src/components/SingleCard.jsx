import { string, number } from "prop-types";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Divider, Paper } from "@mui/material";

const SingleCard = ({
  rating = null,
  publishDate = "",
  body = "",
  author = "Unknown Author",
}) => {
  const isRatingAvailable = rating != null ? true : false;
  const isDateValid = dayjs(publishDate).isValid();
  const date = dayjs(publishDate).format("DD/MM/YYYY");

  return (
    <Paper sx={{ maxWidth: 475, margin: 4 }} elevation={5}>
      <Card sx={{ width: 375, minHeight: 280, padding: 3 }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.secondary">
            {author}
          </Typography>
          <Stack sx={{ display: "flex", alignItems: "center" }} spacing={1}>
            {isRatingAvailable ? (
              <Rating
                name="half-rating-read"
                value={rating}
                precision={0.1}
                readOnly
              />
            ) : (
              <Typography variant="body1" color="text.secondary">
                No Rating Available
              </Typography>
            )}
          </Stack>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Publish date: {isDateValid ? date : "No Date availaable"}
          </Typography>
          <Divider sx={{ paddingTop: 2 }} />
          <Typography sx={{ paddingTop: 2 }} variant="body1">
            {body}
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
};

SingleCard.propTypes = {
  rating: number,
  publishDate: string,
  body: string,
  author: string,
};

export default SingleCard;

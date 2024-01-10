import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router-dom";

function MovieCard({
  original_title,
  overview,
  poster_path,
  vote_average,
  id,
}) {
  return (
    <Card className="componentCard" sx={{ maxWidth: 300, }}>
      <Link to={`/Movie/${id}`} style={{ color: "#d2e0f7"}} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="400"
          image={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt="poster"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5" 
            component="div"
            style={{
              color: "#0390fc",
            }}
          >
            {original_title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              fontSize: 12,
              fontWeight: "bold",

              borderRadius: "15px",
              border: "1px solid #0390fc",
              margin: "10px",
            }}
          >
            {"Vote average: " + vote_average}
          </Typography>
          <Typography className="tak">{overview}</Typography>
        </CardContent>
        
      </CardActionArea>
      </Link>
    </Card>
  );
}
export default MovieCard;

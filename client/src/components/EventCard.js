import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Typography,
  } from "@material-ui/core";
  
  import Rating from "@material-ui/lab/Rating";
  
  const formatter = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
  
  const EventCard = ({ event }) => {
    return (
      <Card>
        <CardHeader
          avatar={<Avatar />}
          title={<Typography variant="h6">{event.name}</Typography>}
        />
  
        <CardContent>
          <Typography variant="caption">{event.description}</Typography>
  
          <Typography variant="h6" gutterBottom>
            {formatter.format(event.price)}
          </Typography>
  
          <Rating
            value={event.rating}
            readOnly
            name={event.name}
            size="small"
            precision={0.5}
          />
        </CardContent>
  
        <CardActions>
          <Button variant="contained" size="small" color="primary">
            Book Now
          </Button>
          <Button size="small" color="primary">
            Learn more
          </Button>
        </CardActions>
      </Card>
    );
  };
  
  export default EventCard;
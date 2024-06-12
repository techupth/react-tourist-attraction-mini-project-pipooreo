import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ViewTripPage() {
  const [trip, setTrip] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const params = useParams();
  let results;

  async function getTrip() {
    try {
      setLoading(true);
      results = await axios.get("http://localhost:4001/trips?keywords=เที่ยว");
      setTrip(results.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTrip();
  }, []);

  return (
    <div className="trips-list">
      {isLoading ? <h1>Loading ...</h1> : null}
      {trip.map((trip) => {
        if (trip.eid === params.id)
          return (
            <div className="trip" key={trip.eid}>
              <div className="trip-image">
                <img src={trip.photos[0]} />
              </div>
              <div className="trip-detail">
                <a href={trip.url} className="title" target="_blank">
                  {trip.title}
                </a>
                <p>{trip.description}</p>
                <div className="trips-tags">
                  <p>หมวด</p>
                  {trip.tags.map((tag, index) => {
                    return (
                      <button className="tag" key={index}>
                        {tag}
                      </button>
                    );
                  })}
                </div>
                <div className="trips-image-list">
                  {trip.photos.map((photo, index) => {
                    if (index > 0) return <img src={photo} key={index} />;
                  })}
                </div>
              </div>
            </div>
          );
      })}
    </div>
  );
}

export default ViewTripPage;

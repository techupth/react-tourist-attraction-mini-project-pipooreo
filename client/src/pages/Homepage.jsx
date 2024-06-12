import { useState, useEffect } from "react";
import axios from "axios";

function Homepage() {
  const [trips, setTrips] = useState([]);
  const [searchText, setSearchText] = useState("");

  async function getTrips() {
    if (searchText) {
      const results = await axios.get(
        `http://localhost:4001/trips?keywords=${searchText}`
      );
      console.log(`http://localhost:4001/trips?keywords=${searchText}`);
      console.log(results.data.data);
      setTrips(results.data.data);
    } else {
      const results = await axios.get(
        "http://localhost:4001/trips?keywords=เที่ยว"
      );
      setTrips(results.data.data);
    }
  }

  function searchTrips(event) {
    setSearchText(event.target.value);
  }

  function handleTag(event) {
    setSearchText(event.target.value);
  }

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  useEffect(() => {
    debounce(getTrips());
  }, [searchText]);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">เที่ยวไหนดี</h1>
        <div className="input-search">
          <label>ค้นหาที่เที่ยว</label>
          <input
            id="search"
            type="text"
            placeholder="หาที่เที่ยวแล้วไปกับ..."
            value={searchText}
            onChange={searchTrips}
          />
        </div>
      </div>
      <div className="trips-list">
        {trips.map((trip) => {
          return (
            <div className="trip" key={trip.eid}>
              <div className="trip-image">
                <img src={trip.photos[0]} />
              </div>
              <div className="trip-detail">
                <a href={trip.url} className="title" target="_blank">
                  {trip.title}
                </a>
                <p className="description">{trip.description}</p>
                <button
                  className="view-button"
                  onClick={() => {
                    window.open(`/trips/view/${trip.eid}`);
                  }}
                >
                  อ่านต่อ
                </button>
                <div className="trips-tags">
                  <p>หมวด</p>
                  {trip.tags.map((tag, index) => {
                    if (index === trip.tags.length - 1) {
                      return (
                        <>
                          <p>และ</p>
                          <button
                            className="tag"
                            key={index}
                            value={searchText}
                            onClick={() => {
                              tag = tag + " " + searchText;
                              setSearchText(tag);
                            }}
                          >
                            {tag}
                          </button>
                        </>
                      );
                    }

                    return (
                      <button
                        className="tag"
                        key={index}
                        value={searchText}
                        onClick={() => {
                          tag = tag + " " + searchText;
                          setSearchText(tag);
                        }}
                      >
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
                <div className="copy-url">
                  <button
                    className="copy-button"
                    onClick={() => {
                      navigator.clipboard.writeText(`${trip.url}`);
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Homepage;

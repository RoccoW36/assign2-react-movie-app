import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getTVShowReviews } from "../../api/tmdb-api"; 
import { excerpt } from "../../util";

import { TVShowDetailsProps, Review } from "../../types/interfaces";

const styles = {
  table: {
    minWidth: 550,
  },
};

const TVShowReviews: React.FC<TVShowDetailsProps> = ({ id, ...props }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (id) {
      getTVShowReviews(id).then((reviews) => {
        setReviews(reviews);
      }).catch((error) => {
        console.error("Error fetching TV show reviews:", error);
      });
    }
  }, [id]); 

  return (
    <TableContainer component={Paper}>
      <Table sx={styles.table} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell>Author</TableCell>
            <TableCell align="center">Excerpt</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.length > 0 ? (
            reviews.map((r: Review) => (
              <TableRow key={r.tvShowId}>
                <TableCell component="th" scope="row">
                  {r.author}
                </TableCell>
                <TableCell>{excerpt(r.content)}</TableCell>
                <TableCell>
                  <Link
                    to={`/reviews/${r.tvShowId}`}
                    state={{
                      review: r,
                      tvShow: props,
                    }}
                  >
                    Full Review
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No reviews available for this TV show.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TVShowReviews;

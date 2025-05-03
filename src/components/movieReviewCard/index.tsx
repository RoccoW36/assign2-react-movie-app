import React from "react";
import { Card, CardContent, Typography, CardActions, Divider, Box } from "@mui/material";
import { MovieReview } from "../../types/interfaces";

interface MovieReviewCardProps {
  review: MovieReview;
  children?: React.ReactNode;
}

const MovieReviewCard: React.FC<MovieReviewCardProps> = ({ review, children }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 3,
        borderRadius: 2,
        padding: 2,
        minWidth: 340,
        maxWidth: 500,
      }}
    >
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          <strong>Movie ID:</strong> {review.movieId}
        </Typography>

        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ wordBreak: "break-word" }}
        >
          <strong>Reviewer:</strong> {review.reviewerId}
        </Typography>

        <Typography variant="body2" color="text.primary" paragraph>
          {review.content}
        </Typography>

        {review.translations && (
          <Box mt={2}>
            <Divider sx={{ mb: 1 }} />
            <Typography variant="subtitle2" gutterBottom>
              <strong>Translations:</strong>
            </Typography>
            {Object.entries(review.translations).map(([lang, data]) => (
              <Box key={lang} sx={{ mb: 1 }}>
                <Typography variant="body2">
                  <strong>{lang.toUpperCase()}:</strong> {data.content}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Last updated: {data.lastUpdated}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        <Typography variant="caption" sx={{ mt: 2, display: "block" }}>
          Date: {review.reviewDate}
        </Typography>
      </CardContent>

      {children && <CardActions sx={{ mt: "auto" }}>{children}</CardActions>}
    </Card>
  );
};

export default MovieReviewCard;

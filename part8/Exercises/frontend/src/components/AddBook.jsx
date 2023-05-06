import { useState } from "react";
import { useMutation } from "@apollo/client";
import queries from "../queries/queries";

import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const AddBook = () => {
  const genresList = [
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Romance",
    "Thriller",
    "Horror",
    "Historical Fiction",
    "Young Adult",
  ];

  const [bookData, setBookData] = useState({
    title: "",
    published: "",
    author: "",
    genres: [],
  });

  const onValueChange = (e) => {
    const { value, name } = e.target;

    if (name === "genres") {
      // If the input field being changed is genres, ensure value is a string before splitting
      const genresArray = value.toString().split(",");

      setBookData((prevValue) => {
        return { ...prevValue, [name]: genresArray };
      });
    } else {
      // For other input fields, update the state normally
      setBookData((prevValue) => {
        return { ...prevValue, [name]: value };
      });
    }
  };
  
  const [createBook] = useMutation(queries.CREATE_BOOK, {
    refetchQueries: [{ query: queries.ALL_BOOKS }],
  });

  const submit = (event) => {
    event.preventDefault();

    const { title, published, author, genres } = bookData;

    const publishedString = parseInt(bookData.published);

    createBook({
      variables: { title, published: publishedString, author, genres },
    });

    setBookData({
      title: "",
      published: "",
      author: "",
      genres: [],
    });
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        backgroundColor: "lightgray",
        padding: "20px",
      }}
    >
      <h2>Add new person</h2>
      <form
        onSubmit={submit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
        }}
      >
        <div style={{ marginBottom: "16px" }}>
          <TextField
            label="Title"
            variant="outlined"
            size="small"
            name="title"
            required
            value={bookData.title}
            sx={{ width: "100%" }}
            onChange={(e) => {
              onValueChange(e);
            }}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "20px" }}>
            <FormControl
              variant="outlined"
              size="small"
              required
              sx={{ width: "50%" }}
            >
              <TextField
                label="Publish Year"
                variant="outlined"
                size="small"
                name="published"
                required
                type="number"
                value={bookData.published}
                InputProps={{ inputProps: { min: 0 } }}
                sx={{ width: "100%" }}
                onChange={(e) => {
                  onValueChange(e);
                }}
              />
            </FormControl>
            <FormControl required sx={{ width: "50%" }}>
              <InputLabel shrink htmlFor="genres-select-label">
                Genres
              </InputLabel>
              <Select
                labelId="genres-select-label"
                id="genres-select"
                multiple
                value={bookData.genres}
                sx={{ width: "100%", marginTop: "7px" }}
                name="genres"
                onChange={onValueChange}
                renderValue={(selected) => selected.join(", ")}
                inputProps={{
                  id: "genres-select-label",
                }}
              >
                {genresList.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            {bookData.genres.length > 0 && (
              <TextField
                label="Selected Genres"
                variant="outlined"
                size="small"
                sx={{ width: "100%", marginTop: "16px" }}
                name="selectedGenres"
                value={bookData.genres.join(", ")}
                disabled
              />
            )}
          </div>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <TextField
            label="Author"
            variant="outlined"
            size="small"
            sx={{ width: "100%" }}
            name="author"
            required
            value={bookData.author}
            onChange={(e) => {
              onValueChange(e);
            }}
          />
        </div>
        <Button type="submit" variant="contained" sx={{ mt: 1 }}>
          Add
        </Button>
      </form>
    </Container>
  );
};

export default AddBook;

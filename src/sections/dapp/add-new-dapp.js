import { useCallback, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
} from "@mui/material";

export const AddNewDapp = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    url: "",
    amount: "",
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          title="dApp Details"
          subheader="Please add following dApp details to add new dApp for affiliate program."
        />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 400 }}>
            <TextField
              style={{ marginBottom: 10 }}
              fullWidth
              label="Name"
              name="name"
              onChange={handleChange}
              type="name"
              value={values.name}
            />
            <TextField
              style={{ marginBottom: 10 }}
              fullWidth
              label="Description"
              name="description"
              onChange={handleChange}
              type="description"
              value={values.description}
            />
            <TextField
              style={{ marginBottom: 10 }}
              fullWidth
              label="Description"
              name="description"
              onChange={handleChange}
              value={values.description}
            />
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              fullWidth
              label="Amount per signup"
              name="amount"
              onChange={handleChange}
              value={values.amount}
              // type='number'
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained">Add</Button>
        </CardActions>
      </Card>
    </form>
  );
};

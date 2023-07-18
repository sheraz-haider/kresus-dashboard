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
import { api } from "src/utils/axios";
import { useRouter } from "next/router";

export const AddNewDapp = () => {
  const router = useRouter();

  const [values, setValues] = useState({
    name: "",
    description: "",
    url: "",
    amount: "",
  });

  const handleChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.post("/dapp", values);

      router.push("/dapps");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          title="dApp Details"
          subheader="Please add following dApp details to add new dApp for affiliate program."
        />
        <Divider />
        <CardContent>
          <Stack spacing={3}
sx={{ maxWidth: 400 }}>
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
              label="Website URL"
              name="url"
              onChange={handleChange}
              value={values.url}
            />
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              fullWidth
              label="Amount per signup"
              name="amount"
              onChange={handleChange}
              value={values.amount}
              type="number"
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained"
onClick={handleSubmit}>
            Add
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

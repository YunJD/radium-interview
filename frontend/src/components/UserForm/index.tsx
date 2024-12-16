import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";
import { SyntheticEvent } from "react";

const fetchUser = async (id: string) => {
  const { data } = await axios.get(`http://localhost:8000/api/users/${id}/`);
  return data;
};

const createUser = async (userData: Record<any, string>) => {
  const { data } = await axios.post(
    "http://localhost:8000/api/users/",
    userData
  );
  return data;
};

const updateUser = async ({ id, ...userData }: Record<any, string>) => {
  const { data } = await axios.put(
    `http://localhost:8000/api/users/${id}/`,
    userData
  );
  return data;
};

function UserForm() {
  const queryClient = useQueryClient();
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("user_id");

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id ?? ""),
    enabled: !!id,
  });

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (result) => {
      window.location.href = `/user-form?user_id=${result.id}`;
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const userData = Object.fromEntries(formData.entries()) as Record<
      any,
      string
    >;

    if (id) {
      updateMutation.mutate({ id, ...userData });
    } else {
      createMutation.mutate(userData);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }
  if (isError) {
    return <Alert severity="error">Error loading user data</Alert>;
  }

  const errors =
    (createMutation.error as any)?.response?.data ??
    (updateMutation.error as any)?.response?.data;
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        {id ? "Edit User" : "Create User"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack gap={2}>
          <TextField
            helperText={errors?.name?.[0]}
            label="Name"
            id="name"
            name="name"
            defaultValue={user?.name}
            fullWidth
            margin="normal"
            required
            error={!!errors?.name}
          />
          <TextField
            helperText={errors?.date_of_birth?.[0]}
            label="Date of Birth (yyyy-mm-dd)"
            id="birth_date_of_birth"
            name="date_of_birth"
            type="date"
            defaultValue={user?.date_of_birth}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors?.date_of_birth}
          />
          <Stack gap={1}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {id ? "Update User" : "Create User"}
            </Button>
            <Button component="a" href="/" variant="outlined">
              Close
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}

export default UserForm;

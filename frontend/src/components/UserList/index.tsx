import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Button,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Container,
  IconButton,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const fetchUsers = async (params: Record<string, string | number>) => {
  const { data } = await axios.get("http://localhost:8000/api/users/", {
    params,
  });
  return data;
};

const deleteUser = async (id: string | number) => {
  await axios.delete(`http://localhost:8000/api/users/${id}/`);
};

function UserList() {
  const [page, setPage] = useState(1);

  const {
    data: usersData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers({ page }),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      if (usersData.results.length === 1) {
        setPage((prev) => Math.max(1, prev - 1));
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["users", page] });
    },
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  const users = usersData.results;
  const pageCount = Math.max(1, Math.ceil((usersData?.count ?? 0) / 5));

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        User List
      </Typography>
      <Button
        component="a"
        href="/user-form"
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
      >
        Add New User
      </Button>
      <List>
        {usersData.count ? (
          users.map((user: Record<string, string | number>) => (
            <ListItem key={user.id} component={Paper} sx={{ mb: 1 }}>
              <ListItemText primary={user.name} />
              <IconButton
                disabled={mutation.isPending}
                component="a"
                href={`/user-form?user_id=${user.id}`}
                color="primary"
                edge="end"
                aria-label="edit"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                disabled={mutation.isPending}
                color="error"
                edge="end"
                aria-label="delete"
                onClick={() => mutation.mutate(user.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))
        ) : (
          <Typography>No users found</Typography>
        )}
      </List>
      <Pagination
        count={pageCount}
        page={page}
        onChange={(_, value) => setPage(value)}
        color="primary"
        sx={{ mt: 2 }}
      />
    </Container>
  );
}

export default UserList;

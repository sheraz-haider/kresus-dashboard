import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import dayjs from "dayjs";
import { useState } from "react";

export const DappsTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  const [open, setOpen] = useState(false);
  const [dappId, setDappId] = useState("");

  console.log({ dappId });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Website Url</TableCell>
                <TableCell>Reward per Signup</TableCell>
                <TableCell>Joined</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((dapp) => {
                const isSelected = selected.includes(dapp.id);
                const createdAt = dayjs(dapp.createdAt).format("DD/MM/YYYY");

                return (
                  <TableRow hover key={dapp.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(dapp.id);
                          } else {
                            onDeselectOne?.(dapp.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={dapp.avatar}>{getInitials(dapp.name)}</Avatar>
                        <Typography variant="subtitle2">{dapp.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{dapp.url}</TableCell>
                    <TableCell>${dapp.amount}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>
                      <Button style={{ marginRight: "10px" }} variant="outlined">
                        Details
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setDappId(dapp.unique_code);
                          setOpen(true);
                        }}
                      >
                        Get Code
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Affiliate Details"}</DialogTitle>
        <Divider />
        <DialogContent>
          <Typography style={{ fontWeight: 600, marginBottom: "10px" }}>Shareable Link</Typography>
          <DialogContentText style={{ marginBottom: "10px" }}>
            Shere the following link with your users to get affiliate rewards.
          </DialogContentText>
          <code style={{ background: "#ebebeb", padding: "8px 16px", borderRadius: "6px" }}>
            <a
              href={`https://kresus-widget.vercel.app/?dapp_id=${dappId}`}
              target="_blank"
              rel="noreferrer"
            >
              https://kresus-widget.vercel.app/?dapp_id={dappId}
            </a>
          </code>

          <Typography style={{ fontWeight: 600, marginBlock: "10px", marginTop: "20px" }}>
            Button Code
          </Typography>
          <DialogContentText>
            Copy the following code and paste it in your website to show the affiliate button.
          </DialogContentText>
          <Typography style={{ marginTop: "10px" }}>
            Place in the <code>{`<head>`}</code> tag of your website.
          </Typography>
          <code
            style={{
              background: "#ebebeb",
              padding: "2px 16px",
              fontSize: "12px",
              display: "block",
              marginTop: "10px",
            }}
          >
            <span>{"<!-- Place this script tag in <head> tag -->"}</span>
          </code>
          <code
            style={{
              background: "#ebebeb",
              padding: "2px 16px",
              fontSize: "12px",
              display: "block",
            }}
          >
            <span>
              {'<script src="https://kresus-widget.vercel.app/widget/kresus.js"></script>'}
            </span>
          </code>
          <Typography style={{ marginTop: "10px" }}>
            Use this code to place the button in your website.
          </Typography>
          <code
            style={{
              background: "#ebebeb",
              padding: "8px 16px",
              fontSize: "12px",
              display: "block",
              marginTop: "10px",
            }}
          >
            <span>{`<button id="kresus" data-aid="${dappId}">Kresus Connect</button>`}</span>
          </code>
        </DialogContent>
        <Divider />

        <DialogActions>
          <Button autoFocus onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

DappsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};

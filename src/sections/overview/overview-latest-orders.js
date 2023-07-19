import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import moment from "moment";
import { Badge } from "@mui/material";

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

export const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Emails" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>email</TableCell>
                <TableCell>dapp_name</TableCell>
                <TableCell sortDirection="desc">created_at</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => {
                const createdAt = moment(order.created_at).format("MMM Do YY");

                return (
                  <TableRow hover key={index}>
                    <TableCell>{order.email}</TableCell>
                    <TableCell>{order.dapp_name}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>
                      {order.is_email_verified === true ? (
                        // <SeverityPill color={"green"}></SeverityPill>
                        <Badge
                          badgeContent={"Verified"}
                          style={{ width: "100%" }}
                          color="success"
                        />
                      ) : (
                        <Badge
                          badgeContent={"Not Verified"}
                          style={{ width: "100%" }}
                          color="error"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};

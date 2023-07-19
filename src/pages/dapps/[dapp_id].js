import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Unstable_Grid2 as Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Head from "next/head";
import { useState } from 'react';
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { DappLatestOrders } from "src/sections/dapp/dapp-latest-orders";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { api } from "src/utils/axios";

const Page = ({ stats }) => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const dappId = stats.unique_code;

  return (
    <>
      <Head>
        <title>dApp Detail | Kresus</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h4" style={{ marginBottom: 30 }}>
              {stats.name}
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setOpen(true);
              }}
            >
              Get Code
            </Button>
          </div>
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={4}>
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value={stats.users.length}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={4}>
              <OverviewTasksProgress sx={{ height: "100%" }} value={stats.users.length} />
            </Grid>
            <Grid xs={12} sm={6} lg={4}>
              <OverviewTotalProfit sx={{ height: "100%" }} value={`$${stats.users.length * stats.amount}`} />
            </Grid>
            <Grid xs={12} lg={12}>
              <OverviewSales
                chartSeries={[
                  {
                    name: "This year",
                    data: [12, 16, 5, 8, 5, 14, 14, 16, 17, 15, 18, 20],
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            {/* <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                chartSeries={[30, 60]}
                labels={["Organic", "Paid"]}
                sx={{ height: "100%" }}
              />
            </Grid> */}
            {/* <Grid xs={12} md={6} lg={4}>
              <OverviewLatestProducts topDapps={topDapps} sx={{ height: "100%" }} />
            </Grid> */}
            <Grid xs={12} md={12} lg={12}>
              <DappLatestOrders
                latestEmails={stats.users}
                sx={{ height: "100%" }}
                dappName={stats.name}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
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
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

export const getServerSideProps = async (ctx) => {
  const dappId = ctx.params.dapp_id;

  try {
    const { data } = await api.get(`/dapp/${dappId}`);

    return {
      props: {
        stats: data,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
};

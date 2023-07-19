import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon
} from '@mui/material';

export const OverviewLatestProducts = (props) => {
  const { sx, topDapps = [] } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Top 3 dApps" />
      <List>
        {topDapps.map((dapp, index) => {
          const hasDivider = index < topDapps.length - 1;

          return (
            <ListItem
              divider={hasDivider}
              key={dapp.id}
            >
              <ListItemAvatar>
                {
                  dapp.image
                    ? (
                      <Box
                        component="img"
                        src={dapp.image}
                        sx={{
                          borderRadius: 1,
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                    : (
                      <Box
                        sx={{
                          borderRadius: 1,
                          backgroundColor: 'neutral.200',
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                }
              </ListItemAvatar>
              <ListItemText
                primary={dapp.dapp_name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Brought ${dapp.count} signups in total`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              {/* <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton> */}
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};

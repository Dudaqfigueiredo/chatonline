import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';

function NotFound() {
  return (
    <>
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage:
            'url(https://media.discordapp.net/attachments/759206350294089749/938591738765922355/back404.png?width=722&height=406)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: {
              xs: 'column',
            },
            width: '100%',
            maxWidth: '700px',
            border: `1px solid ${appConfig.theme.colors.primary['200']}`,
            borderRadius: '5px',
            padding: '32px',
            margin: '16px',
            boxShadow: '0 3px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals['opacity'],
          }}
        >
          <Text
            tag="a"
            href="/"
            styleSheet={{ display: 'flex', justifyContent: 'center' }}
          >
            <Image
              tag="a"
              styleSheet={{
                margin: '1rem .5rem 2rem .5rem',
                borderRadius: '5px',
                padding: '1rem',
                margin: '16px',
                width: '40%',
                filter: `drop-shadow(1px 1px 11px ${appConfig.theme.colors.primary[200]})`,
                transition: 'ease-in .4s',
                hover: {
                  filter: `drop-shadow(1px 1px 11px ${appConfig.theme.colors.primary[400]})`,
                  transform: 'scale(1.1)',
                },
              }}
              src="./arcanecord.png"
            />
          </Text>
          <Text
            variant="heading3"
            styleSheet={{
              color: appConfig.theme.colors.primary['200'],
              display: 'flex',
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '4px',
              marginRight: '8px',
              transition: 'ease .8s',
              alignItems: 'center',
              textAlign: 'center',
              hover: {
                color: appConfig.theme.colors.neutrals[100],
              },
            }}
          >
            404 | Página não encontrada
          </Text>
        </Box>
      </Box>
    </>
  );
}

export default NotFound;

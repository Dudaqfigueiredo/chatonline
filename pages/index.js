import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import React from 'react';

function Titulo(props) {
  const Tag = props.tag || 'h1';
  console.log(props.children);
  return (
    <>
      <Tag>{props.children}</Tag>

      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

//Componente React
/* function HomePage() {
  //JSX;
  return (
    <div>
      <GlobalStyle />
      <Titulo tag="h2">Bem vinda de volta!</Titulo>
      <h2>Discord - Alura Matrix</h2>
    </div>
  );
} */
/* export default HomePage; */

export default function PaginaInicial() {
  const [username, setUsername] = React.useState('');
  const roteamento = useRouter();
  return (
    <>
      <video
        id="background-video"
        autoplay="autoplay"
        loop
        muted
        style={{ zIndex: 0 }}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <style jsx>
        {`
          #background-video {
            width: 100vw;
            height: 100vh;
            object-fit: cover;
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: -1;
          }
        `}
      </style>
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply',
          zIndex: 2,
          boxShadow: '10px 10px 10px orange',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%',
            maxWidth: '700px',
            borderRadius: '5px',
            padding: '32px',
            margin: '16px',
            boxShadow: '0 2px 10px 2px #2b0242',
            backgroundColor: appConfig.theme.colors.neutrals[700],
            // backgroundColor: appConfig.theme.colors.neutrals['opacity'],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              //window.location.href = '/chat';
              roteamento.push(`/chat?username=${username}`);
            }}
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '100%', sm: '50%' },
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Bem-vinda!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: '32px',
                color: appConfig.theme.colors.neutrals['300'],
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={function (event) {
                const valor = event.target.value;
                setUsername(valor);
              }}
              autoComplete="off"
              placeholder="Digite seu username do Github"
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals['000'],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary['550'],
                  backgroundColor: appConfig.theme.colors.neutrals['600'],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals['000'],
                mainColor: appConfig.theme.colors.primary[560],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[570],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[700],

              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
                border: '1px solid #8a0cd3',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals['000'],
                backgroundColor: appConfig.theme.colors.primary[570],
                padding: '3px 10px',
                borderRadius: '1000px',
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}

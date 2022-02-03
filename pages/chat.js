import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzgyOTg3NiwiZXhwIjoxOTU5NDA1ODc2fQ.LrpNE6EEnU-KL3D1dfprRgVg1xuyI2JbZDSQoviMAuM';
const SUPABASE_URL = 'https://gtjfhncamfygaufyudwa.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from('mensagens')
    .on('INSERT', (respostaLive) => {
      adicionaMensagem(respostaLive.new);
    })
    .subscribe();
}

export default function ChatPage() {
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;
  const [mensagem, setMensagem] = React.useState('');
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

  React.useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        setListaDeMensagens(data);
      });

    const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
      setListaDeMensagens((valorAtualDaLista) => {
        return [novaMensagem, ...valorAtualDaLista];
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      de: usuarioLogado,
      texto: novaMensagem,
    };
    supabaseClient
      .from('mensagens')
      .insert([mensagem])
      .then(({ data }) => {
        /*         setListaDeMensagens([data[0], ...listaDeMensagens]); */
      });
    setMensagem('');
  }

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
          color: appConfig.theme.colors.neutrals['000'],
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            borderRadius: '5px',
            backgroundColor: appConfig.theme.colors.neutrals[700],
            height: '100%',
            maxWidth: '95%',
            maxHeight: '95vh',
            padding: '32px',
          }}
        >
          <Header />

          <Box
            styleSheet={{
              position: 'relative',
              display: 'flex',
              flex: 1,
              height: '80%',
              backgroundColor: appConfig.theme.colors.neutrals[700],
              flexDirection: 'column',
              borderRadius: '5px',
              padding: '16px',
            }}
          >
            <MessageList mensagens={listaDeMensagens} />
            {/* {listaDeMensagens.map((mensagemAtual) => {
                return (
                <li key={mensagemAtual.id}>
                    {mensagemAtual.de}: {mensagemAtual.texto}
                </li>
                );
            })} */}

            <Box
              as="form"
              styleSheet={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TextField
                value={mensagem}
                onChange={(event) => {
                  setMensagem(event.target.value);
                }}
                //Tecla que está apertando
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault(); //Não ficar pulando linha

                    handleNovaMensagem(mensagem);
                  }
                  //console.log(event);
                }}
                placeholder="Insira sua mensagem aqui..."
                type="textarea"
                styleSheet={{
                  width: '100%',
                  border: '0',
                  resize: 'none',
                  borderRadius: '5px',
                  padding: '6px 8px',
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                  marginRight: '12px',
                  color: appConfig.theme.colors.neutrals[200],
                }}
              />
              <Button
                disabled={!mensagem}
                onClick={() => {
                  if (mensagem.trim() !== '') handleNovaMensagem(mensagem);
                  else setMensagem('');
                }}
                iconName="paperPlane"
                rounded="none"
                buttonColors={{
                  contrastColor: `${appConfig.theme.colors.primary[550]}`,
                  mainColor: `${appConfig.theme.colors.neutrals[800]}`,
                  mainColorLight: `${appConfig.theme.colors.neutrals[800]}`,
                  mainColorStrong: `${appConfig.theme.colors.neutrals[900]}`,
                }}
                styleSheet={{
                  borderRadius: '50%',
                  padding: '0 3px 0 0',
                  minWidth: '50px',
                  minHeight: '50px',
                  fontSize: '30px',
                  margin: '0 8px',
                  lineHeight: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
              {/* CallBack */}
              <ButtonSendSticker
                onStickerClick={(sticker) => {
                  // console.log('[USANDO O COMPONENTE] Salva esse sticker no banco', sticker);
                  handleNovaMensagem(':sticker: ' + sticker);
                }}
              />
            </Box>
          </Box>
          <Musica />
        </Box>
      </Box>
    </>
  );
}

function Header() {
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;

  return (
    <>
      <Box
        styleSheet={{
          width: '100%',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text variant="heading5" styleSheet={{ color: 'white', zIndex: 2 }}>
          Chat - Mulheres na Computação
        </Text>
        <Box styleSheet={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src={`https://github.com/${usuarioLogado}.png`}
            styleSheet={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'inline-block',
              marginRight: '8px',
              transition: 'ease .2s',
              zIndex: 2,
              hover: {
                width: '46px',
                height: '46px',
              },
            }}
          />
          <Button
            variant="tertiary"
            colorVariant="neutral"
            label="Logout"
            href="/"
            styleSheet={{ color: 'white' }}
          />
        </Box>
      </Box>
    </>
  );
}

function MessageList(props) {
  console.log('MessageList', props);
  const options = { hourCycle: 'h23' };
  return (
    <>
      <Box
        tag="ul"
        styleSheet={{
          overflow: 'scroll',
          overflowX: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
          flex: 1,
          color: appConfig.theme.colors.neutrals['000'],
          marginBottom: '16px',
        }}
      >
        {props.mensagens.map((mensagem) => {
          return (
            <Text
              key={mensagem.id}
              tag="li"
              styleSheet={{
                borderRadius: '5px',
                padding: '6px',
                marginBottom: '12px',
                hover: {
                  backgroundColor: appConfig.theme.colors.neutrals[700],
                },
              }}
            >
              <Box
                styleSheet={{
                  marginBottom: '8px',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Image
                  styleSheet={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '8px',
                    hover: {
                      width: '35px',
                      height: '35px',
                    },
                  }}
                  src={`https://github.com/${mensagem.de}.png`}
                />
                <Text tag="strong">
                  <Text
                    tag="a"
                    href={`https://github.com`}
                    target="_blank"
                    styleSheet={{
                      color: appConfig.theme.colors.neutrals[200],
                      textDecoration: 'none',
                      hover: {
                        color: appConfig.theme.colors.primary[550],
                      },
                    }}
                  >
                    {mensagem.de}
                  </Text>
                </Text>
                <Text
                  styleSheet={{
                    fontSize: '10px',
                    marginLeft: '8px',
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {new Date().toLocaleDateString()}{' '}
                  {new Date().toLocaleTimeString([], {
                    hourCycle: 'h23',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </Box>
              {mensagem.texto.startsWith(':sticker:') ? (
                <Image
                  styleSheet={{ maxWidth: '7rem' }}
                  src={mensagem.texto.replace(':sticker:', '')}
                />
              ) : (
                mensagem.texto
              )}
            </Text>
          );
        })}
      </Box>
    </>
  );
}

function Musica() {
  return (
    <>
      <div>
        <audio id="music" controls="controls" loop="-1">
          <source src="/background.mp4" type="audio/mp3" />
        </audio>
      </div>
      <style jsx>
        {`
          audio {
            margin-top: 1%;
            margin-left: 80%;
          }
          audio::-webkit-media-controls-enclosure {
            background-color: #bd4cff63;
            index-z: 2;
            margin-top: 5%;
          }
        `}
      </style>
      <Box></Box>
    </>
  );
}

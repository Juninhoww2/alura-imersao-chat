import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI5MTM0NSwiZXhwIjoxOTU4ODY3MzQ1fQ.ElxsN6BLgXkd7UXJ-3fKbLdjqn5WIqs4f6Sd7LNmV_U';
const SUPABASE_URL = 'https://idwhoxevueqvpausrjmx.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5' styleSheet={{ color: appConfig.theme.colors.person.white }}>
                    Chat
                </Text>
                <Button
                    label='Logout'
                    href="/"
                    styleSheet={{
                        color: appConfig.theme.colors.person.white,
                        backgroundColor: 'transparent',
                        hover: {
                            backgroundColor: appConfig.theme.colors.person.black
                        }
                    }}
                />
            </Box>
        </>
    )
}




export default function PaginaDoChat() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const usuario = appConfig.username;

    const handleApagarMensagem = (e, mensagemID, mensagemDe) => {
        e.preventDefault();
        if (usuario == mensagemDe) {
            supabaseClient
                .from('mensagens')
                .delete()
                .match({ id: mensagemID })
                .then(({ data }) => {
                    const apagarElementoLista = listaDeMensagens.filter(
                        (mensagem) => mensagem.id !== mensagemID
                    );
                    setListaDeMensagens(apagarElementoLista);
                    setIsLoaded(true);
                    window.alert('Mensagem excluída!.');
                })
        } else {
            window.alert('Você não pode excluir mensagens de outros usuários!')
        }
    };

 
    React.useEffect(() => {
        supabaseClient
            .from('Mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                console.log('dados da consulta: ', data);
                setListaDeMensagens(data);
                setIsLoaded(true);
            });
    }, []);



    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            // id: listaDeMensagens.length + 1,
            de: usuario,
            texto: novaMensagem,
        }

        supabaseClient
            .from('Mensagens')
            .insert([
                mensagem
            ])
            .then(({ data }) => {
                console.log('Criando a mensagem: ', data);
                setListaDeMensagens([
                    data[0],
                    ...listaDeMensagens,
                ]);
            })
        setMensagem('');
        setIsLoaded(true);
    }

    if (!isLoaded) {
        return (
            <>
                <Box
                    styleSheet={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                >
                    <img src='/img/errorImage.png' className='carregando' />
                </Box>
            </>
        )
    }

    if (isLoaded) {
        return (
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundImage: 'url(/img/banner.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply', backgroundAttachment: 'fixed',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        borderRadius: '5px',
                        backgroundColor: appConfig.theme.colors.person.transparent_black,
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
                            backgroundColor: appConfig.theme.colors.person.transparent_black,
                            flexDirection: 'column',
                            borderRadius: '5px',
                            padding: '16px',
                        }}
                    >
                        <Box
                            tag="ul"
                            styleSheet={{
                                overflowY: 'scroll',
                                display: 'flex',
                                flexDirection: 'column-reverse',
                                flex: 1,
                                color: appConfig.theme.colors.neutrals["000"],
                                marginBottom: '16px',
                            }}
                        >

                            {listaDeMensagens.map((mensagem) => {
                                return (
                                    <Text
                                        key={mensagem.id}
                                        key={mensagem.id}
                                        tag="li"
                                        styleSheet={{
                                            borderRadius: '5px',
                                            padding: '6px',
                                            marginBottom: '12px',
                                            wordWrap: 'break-word',
                                            hover: {
                                                backgroundColor: appConfig.theme.colors.neutrals[700],
                                            }
                                        }}
                                    >
                                        <Box
                                            styleSheet={{
                                                marginBottom: '8px',
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <Box>
                                                <Image
                                                    styleSheet={{
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '50%',
                                                        display: 'inline-block',
                                                        marginRight: '8px',
                                                    }}
                                                    src={`https://github.com/${mensagem.de}.png`}
                                                />
                                                <Text tag="strong">
                                                    {mensagem.de}
                                                </Text>
                                                <Text
                                                    styleSheet={{
                                                        fontSize: '10px',
                                                        marginLeft: '8px',
                                                        color: appConfig.theme.colors.neutrals[300],
                                                    }}
                                                    tag="span"
                                                >
                                                    {(new Date().toLocaleDateString())}
                                                </Text>
                                            </Box>
                                            <Box
                                                onClick={(e) => handleApagarMensagem(e, mensagem.id, mensagem.de)}
                                                title={`Apagar mensagem`}
                                                styleSheet={{
                                                    padding: '2px 15px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                X
                                            </Box>
                                        </Box>
                                        {mensagem.texto}
                                    </Text>
                                );
                            })}
                        </Box>
                        {/* end lista de mensagens */}


                        {/* formulário */}
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
                                    const valor = event.target.value;
                                    setMensagem(valor);
                                }}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter' && mensagem.length > 0) {
                                        event.preventDefault();
                                        handleNovaMensagem(mensagem);
                                    }

                                }}
                                placeholder="Insira sua mensagem aqui..."
                                type="textarea"
                                styleSheet={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    backgroundColor: appConfig.theme.colors.person.transparent_black,
                                    marginRight: '12px',
                                    color: appConfig.theme.colors.person.white,
                                }}
                            />
                            <Button
                                type='submit'
                                label='Enviar'
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (mensagem.length !== 0) {
                                        handleNovaMensagem(mensagem);
                                    }

                                }}
                                styleSheet={{
                                    padding: '8px 15px'
                                }}
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.person.black,
                                    mainColor: appConfig.theme.colors.person.button,
                                    mainColorLight: appConfig.theme.colors.person.button,
                                    mainColorStrong: appConfig.theme.colors.person.button,
                                }}
                            />
                        </Box>
                        {/* end formulário */}
                    </Box>
                </Box>
            </Box>
        )
    }
}
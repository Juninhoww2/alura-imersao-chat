import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

function Title(props) {
    console.log(props.children);
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.person.white};
                    font-size: 30px;
                    font-weight: 600;
                }
            `}</style>
        </>
    );
}

export default function PaginaInicial() {
    // const username = 'Usuario';
    const [username, setUsername] = React.useState('');
    const roteamento = useRouter();
    const errorImage = '/img/errorImage.png';
    const [loading, setLoading] = useState(false)
    
    const handleGitHubLogin = async () => {
        try {
        setLoading(true);
        const { error } = await supabase.auth.signIn({
            provider: 'github',
        });
        if (error) throw error;
        } catch (error) {
        alert(error.error_description || error.message);
        } finally {
        setLoading(false);
        }
    };

    return (
        <>
            {/* box */}
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundImage: 'url(/img/banner.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply', backgroundAttachment: 'fixed',
                }}
            >
                {/* box-center */}
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '52px', margin: '16px',
                        backgroundColor: appConfig.theme.colors.person.transparent_black,
                    }}
                >

                    {/* formulário */}
                    <Box
                        as="form"
                        onSubmit={function (infosDoEvento) {
                            infosDoEvento.preventDefault();
                            appConfig.username = username;
                            roteamento.push('/chat');
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <img src={`/img/icon1.png`} ></img>
                        <Title tag="h1">Bem vindo!</Title>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            fullWidth
                            value={username}
                            textFiealdColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                            styleSheet={{
                                marginBottom: '10px',
                                border: 'black',
                                focus: {
                                    boxShadow: '0 0 0 0',
                                    outline: '0',
                                },
                            }}
                            onChange={function (e) {
                                const valor = e.target.value;
                                setUsername(valor);

                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.person.black,
                                mainColor: appConfig.theme.colors.person.button,
                                mainColorLight: appConfig.theme.colors.person.button,
                                mainColorStrong: appConfig.theme.colors.person.button,
                            }}
                            styleSheet={{
                                border: '1px solid #2d2d',
                            }}
                        />
                        <Button
                            fullWidth
                            
                            styleSheet={{ display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid #2d2d',
                            margin: '5px'
                            }}
                            onClick={() => handleGitHubLogin()}
                        >
                        </Button>
                    </Box>
                    {/* end formulário */}

                    {/*  Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '250px',
                            padding: '16px',
                            backgroundColor: 'trasnparent',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                                boxShadow: '0 0 5px 0 #fff',
                            }}
                            src={username.length > 2 ? `https://github.com/${username}.png` : errorImage}
                        />

                        <a
                            href={`https://github.com/${username}`}
                            target={'_blank'}
                        >
                            <Text
                                variant="body4"
                                styleSheet={{
                                    color: appConfig.theme.colors.person.white,
                                    padding: '5px 15px',
                                    borderRadius: '1000px',
                                    fontSize: '16px',
                                    hover: {
                                        backgroundColor: appConfig.theme.colors.person.grey1,
                                    }
                                }}
                            >
                                {username}
                            </Text>
                        </a>

                    </Box>
                    {/*  end Photo Area */}
                </Box>
                {/* end box-center */}
            </Box>
            {/* end box */}
        </>
    );
}
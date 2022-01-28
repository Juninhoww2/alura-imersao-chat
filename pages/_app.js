function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              list-style: none;
          }
          @import url('https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&display=swap');
          body {
              font-family: 'Mochiy Pop P One', sans-serif;
          }
          /* App fit Height */ 
          html, body, #__next {
              min-height: 100vh;
              display: flex;
              flex: 1;
          }
          #__next {
              flex: 1;
          }
          #__next > * {
              flex: 1;
          }
          /* ./App fit Height */ 
          a {
              text-decoration: none;
          }
          .carregando {
              max-width: 200px;
              max-height: 200px;
              animation: rotation .5s linear infinite; 
          }
          @keyframes rotation {
              to {
                  transform: rotate(90deg);
              }
          }
      `}</style>
  );
}


export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />,
      <Component {...pageProps} />
    </>
  )
}
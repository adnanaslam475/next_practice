import Layout from '../Components/Layout'
import '../styles/globals.css'
import Header from '../Components/Header'
import withRedux, { createWrapper } from "next-redux-wrapper";
import AuthReducer from '../redux/reducer'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

const rootReducer = combineReducers({
  auth: AuthReducer,
})
const store = createStore(rootReducer);
const makeStore = () => store;
const wrapper = createWrapper(makeStore, { debug: true });

function MyApp(props) {
  const { Component, pageProps } = props;
  console.log('pageprops', props)

  return <Provider store={store}>
    <Layout>
      <Header />
      <Component {...pageProps} />
    </Layout >
  </Provider>
}
// MyApp.getInitialProps = async ({ Component, ctx }) => {
//   const pageProps = Component.getInitialProps
//     ? await Component.getInitialProps(ctx)
//     : {};
//   return { pageProps };
// };

export default wrapper.withRedux(MyApp);
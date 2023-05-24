import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { configureStore } from "../store";

const store = configureStore().store;
const persistor = configureStore().persistor;

const ReduxProvider = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);

export default ReduxProvider;

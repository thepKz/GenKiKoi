import { QueryClient, QueryClientProvider } from 'react-query';
import MainRouter from "./routers/MainRouter";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainRouter />
    </QueryClientProvider>
  );


};

export default App;

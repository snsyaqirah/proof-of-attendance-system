import { Routes, Route, Link } from 'react-router-dom';
import CreateEvent from './pages/organiser/CreateEvent';
import MyEvents from './pages/organiser/MyEvents';
import Events from './pages/user/Events';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IotaClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider>
          <div style={{ padding: '2rem' }}>
            <h1>Proof of Attendance</h1>
            <nav style={{ marginBottom: '1rem' }}>
              <Link to="/organiser/create">Create Event</Link> |{' '}
              <Link to="/organiser/myevents">My Events</Link> |{' '}
              <Link to="/events">All Events</Link>
            </nav>
            <Routes>
              <Route path="/organiser/create" element={<CreateEvent />} />
              <Route path="/organiser/myevents" element={<MyEvents />} />
              <Route path="/events" element={<Events />} />
            </Routes>
          </div>
        </WalletProvider>
      </IotaClientProvider>
    </QueryClientProvider>
  );
}

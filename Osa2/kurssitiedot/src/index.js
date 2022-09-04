import { createRoot } from 'react-dom/client';
import App from './App';
import Courses from './components/Courses';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);
import { personalInfo } from '../data/content';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <p>Designed & coded with obsession · {year} · {personalInfo.name}</p>
      </div>
    </footer>
  );
}
